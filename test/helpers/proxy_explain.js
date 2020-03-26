/** @format */

class Page {
  goto() {
    console.log('je pars sur une autre page');
  }

  setcookie() {
    console.log('Im setting a cookie');
  }
}

class CustomPage {
  login() {
    console.log('All of our login logiv');
  }
}

class CustomPage {
  static build() {
    const page = new Page();
    const customPage = new CustomPage();

    const superPage = new Proxy(customPage, {
      get: function(target, property) {
        return target[property] || page[property];
      }
    });

    return superPage;
  }
}

// usage
superPage.goto();
superPage.login();
superPage.setcookie();

class Greetings {
  english() {
    return 'Hello';
  }
  spanish() {
    return 'Hola';
  }
}

class MoreGreetings {
  german() {
    return 'Hallo';
  }
  french() {
    return 'Bonjour';
  }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

const allGreeting = new Proxy(moreGreetings, {
  get: function(target, property) {
    console.log(property);
  }
});

allGreeting.french;
