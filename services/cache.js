/** @format */

const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;

  this.haskKey = JSON.stringify(options.key || 'default');
  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  //See if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.haskKey, key);
  // If we do , return data

  if (cacheValue) {
    console.log('INSIDE REDIS');
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);

    // return JSON.parse(cacheValue);
  }

  //Otherwise , issue the query and store the result in redis

  console.log('INSIDE MONGODB');
  const result = await exec.apply(this, arguments);
  // console.log(result);
  client.hset(this.haskKey, key, JSON.stringify(result));

  return result;
};

module.exports = {
  clearHash(hashkey) {
    client.del(JSON.stringify(hashkey));
  }
};
