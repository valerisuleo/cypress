

# Cypress

#### What is it?

*An open source, front-end testing tool built for the modern web.*

### Agenda

- Intro and Install
- Understanding cypress API libraries
- Understanding cypress features sets
- Working with cypress variables context, commands and debugging
- Understanding cypress async behaviour
- Understanding CI/CD
- Understanding Network request, Parallelization etc.

## Section 1 - Introduction and Getting Started

### Installing

1. `npm install cypress`
2. `npx cypress open`

> **NB** `npx` is a different way of execute npm package binaries.


### Write a simple Cypress Test

Let's create a login form

```
<h1>Login</h1>

<form (ngSubmit)="submit()">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" [(ngModel)]="login.email" name="email">
  </div>

  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" [(ngModel)]="login.password" name="password">
  </div>


  <p>{{ login | json  }}</p>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

Our Cypress test will look something like this:

```
/// <reference types="Cypress" />

describe('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/home')
  })

  it('Login', () => {
    cy.contains('Login');

  })
})
```

> **NB** without `/// <reference types="Cypress" />` it won't work because can't find `cy`.

This is a bit generic because we are telling him where it should look for the string *Login* and we can also check if we are on the right path

```
  it('Login', () => {
    // cy.contains('Login');
    cy.get('h1').contains('Login');
    cy.url().should('include', 'home');
  })
```

This is much better.


> **Cheap Tip**: if you wanna run just one operation inside your test you can do `it.only('Understanding Cypress Wrap Commands', () => {`

## Section 2 - Getting handle with Cypress

### Working with CLI

We can run a test from the terminal by running this command `npx cypress run`

> !!! It works... however in this way is gonna execute all the testes but we re interested only in the _login_ one.

Let's copy the full path inside our ide and type:

```
npx cypress run --spec /Users/whatever/development/cypress-course/cypress/integration/simple-cy-code/login.spec.ts
```

Awesome it's running just the login test as expected!

In the console we can also see that cypress is saving a **video** of our test:

```
- Started processing:   Compressing to 32 CRF
  - Finished processing:  /Users/whatever/development/cypress-course/cypress/videos/simple-cy-code/login.spec.ts.mp4 (0 seconds)
```

we can also run this test in a specific **browser** by adding `--browser chrome` just like this:

```
npx cypress run --spec /Users/valeriorisuleo/development/cypress-course/cypress/integration/simple-cy-code/login.spec.ts --browser chrome
```

### Cypress UI interaction commands

We are going to discuss some of the most common cypress commands

- `Click()`
- `Type()`
- `Clear()`
- `Check()`
- `Select()`

#### May the `force` be with you

When we test an event listner we can pass also `args`, and an argument it comes to use quite often is `{force: true}`

`cy.get('.btn-primary').click({force: true});`

It's very useful however keep in mind that every time we use it cypress <u>will not perform</u> these operations:


- Scroll the element into view
- Ensure it is visible
- Ensure it is not disabled
- Ensure it is not readonly
- Ensure it is not animating
- Ensure it is not covered
- Fire the event at a descendent

Each event listener has specific arguments:


| Option     | Default   | Description   |
|:--------|:-------|:-------|
| `log` | `true` | Displays the command in the Command log
| `force` | `false` | Forces the action, disables waiting for actionability
| `multiple` | `false` | Serially click multiple elements
| `timeout ` | `defaultCommandTimeout` | Time to wait for .click() to resolve before timing out

### Cypress advanced commands



We are going to discuss some of the most common cypress commands

- `visit()`
- `get()`
- `wrap()`
- `find()`
- `parent()`
- `filter()`
- `each()`


>  Filter Vs Find
>
> `filter()` _Get the DOM elements that match a specific selector_

> `find()` _Get the descendent DOM elements of a specific selector, more like query behaviour of jQuery_



```
  it('selecting anyone of the list which has the name as Mark', () => {
      // check if we are on the right element
      cy.contains('Employees').click()
      // find table with all rows
      cy.get('.table')
      .find('tr')
      .filter('td')
  })
```

Ooops...

```
CypressError: Timed out retrying: Expected to find element: 'td',
but never found it. Queried from element: [ <tr>, 3 more... ]
```

It's telling us that the `tr` are 4 but the `td` are actually 0.

```
  it('selecting anyone of the list which has the name as Mark', () => {
      cy.contains('Employees').click();
      // find table with all rows
      cy.get('.table')
      // find td inside tr
      .find('tr > td')
      // check for Jacob and get its parent
      .contains('Jacob').parent()
      // get its associated Benefit and then click
      .contains('Benefit').click();
  })
```

The error is gone and if we inspect the elements we can reach all the `td`


### Working with variables in Cypress

In cypress everything is **async** so in order words we need a Promise and in order to resolve a promise we have to learn how to use the `then()` method.

Cypress doesn't execute the code line by line, rather it stores everything in a queue:

| Command Execution Order   
|:--------|
| `cy.get('h1').contains('Login')` |
| `cy.url().should('include', 'home')` |
| `cy.get('#exampleInputEmail1').type('em@ga.co')` |
| `cy.get('.btn-primary').click()` |

That is why...

```
// ...this won't work...

// nope
const button = cy.get('button')

// nope
const form = cy.get('form')

// nope
button.click()
```

To access what each Cypress command yields you use `then()`

```
  it('Login', () => {
    cy.get('.btn-primary')
    .then((el) => {
        const btnTxt = el.text();
        console.log(btnTxt);
    });
  })
```


### Understanding Alias

Alias are very special constructor in cypress which has many different applications something like

1. Accessible variables outside of `then()`, hooks, etc.
2. Working with UI elements
3. Working with `cy.fixture()` - DDT
4. Working with Routes for XHR and API testing


#### Access variables from outside

```
  it('Login', () => {
    cy.get('.btn-primary')
    .then((btn) => {
        return btn.text();
    }).as('btnText')
  })
```

Whatever returns after we resolved the promise it will be store here `as('btnText')` an _alias_ and we can can access to it in this way:

```
 it('Login', () => {
      cy.get('.btn-primary')
      .then((btn) => {
          return btn.text();
      }).as('btnText');

      cy.get('@btnText')
      .then((string) => {
          expect(string).is.eql('Submit');
      });
  });
```

This is a the _long way_ of working with Promise. Let's do some **refactoring** by use a cypress built in method `invoke()`:

```
  it('Login', () => {

      cy.get('.btn-primary').invoke('text').as('btnText');

      cy.get('@btnText')
      .then((string) => {
          expect(string).is.eql('Submit');
      });
  });
```

> **Note:** Doing `return btn.text();` is the same thing of doing `.invoke('text')`. In other words _invoke_ is the shorthand for _then_.


#### Working with Alias for UI operations

Let's have a look at the `wrap()` method. This time we want to `click` on each `row` in our `table`.

First we wanna store the `tr` into an alias of rows:

 ```
 cy.get('.table').find('tr').as('rows');
 ```

 and then...

 ```
   it('Working with UI elements', () => {
      cy.get('.table').find('tr').as('rows');
      cy.get('@rows')
      .then((rows) => {
          cy.wrap(rows).click({multiple: true});
      });
  });
 ```

> `{multiple: true}` allows use to click on each row.



### Understanding Cypress Wrap Commands

_Yield the object passed into_ `.wrap()`

**Meaning**: anyone of the object that you pass within the wrap method will actually get its actual object properties and members out from it.

Different applications:

1. We can use it to check if an obj returning from a service has a property.

	```
	  it('Understanding Cypress Wrap Commands', () => {
      cy.wrap({ name: 'Hulk'})
      .should('have.property', 'name').and('eq', 'Hulk');
  		});
  	```

2. Remember when we did...

	```
	  it('Cypress advanced commands', () => {
      cy.contains('Employees').click();

      // find table with all rows
      cy.get('.table')

      // find td inside tr
      .find('tr > td')

      // check for Jacob and get its parent
      .contains('Jacob').parent()

      // get its associated Benefit and then click
      .contains('Benefit').click();
  		})
  	```

  	...now can do:
  
	```
      cy.get('.table').find('tr > td')
      .then((td) => {
          cy.wrap(td).contains('Jacob')
          .invoke('wrap').parent()
          .contains('Benefit').click();
      });
	```


### Working with Assertions

There are 2 types of waiting mechanism available in Cypress.

- Explicit assertions - `expect()`
- Implicit assertions  - `should()`

> How these assertions work?

Cypress has a built in retry-ability in almost every command and especially, the wait mechanism isn assertions are really handy!

#### Implicit wait

```
  it('Working with Assertions', () => {
      cy.get('jump to slide 2', {timeout: 6000})
     .should('have.class', 'ls-nav-active');
  });
```

#### Explicit wait

```
  it('Working with Assertions', () => {
      cy.get('jump to slide 2', {timeout: 6000})
     .should((el) => {
         expect(el).to.have.class('ls-nav-active');
     });
  });
```

### Working with fixture

This is a powerful tool to pass data from an external file and we can do that in 2 very simple steps:

1. `touch fixures/keychain.json`

	```
	{
	  "email": "emma@ga.co",
	  "password": "mypass"
	}
	```

2. back to `fixture.spec.ts`

	```
	describe('Actions', () => {
	  beforeEach(() => {
	    cy.fixture('keychain').as('user');
	  })
	```

	We get our data and make an _alias_. In this way we can access to it from outside just like this:

	```
	    it('Login', () => {
        cy.get('@user').then((user) => {
            cy.get('#exampleInputEmail1').type(user.email);
            cy.get('#exampleInputPassword1').type(user.password);
        });
    });
	```

## Section 3: Advanced features

### Custom commands

Cy comes with its own API for creating custom commands and overwriting existing commands.

_custom commands are a great place to define or override commands in your_ `cypress/support/command.js` _file since it is loaded before any test files are evaluated via an import statement_ in `cypress/support/index.js`

#### Synthax

```
Cypress.Commands.add(name, callbackFn)
Cypress.Commands.add(name, options, callbackFn)
Cypress.Commands.overwrite(name, callbackFn)
Cypress.Commands.overwrite(name, options, callbackFn)
```


## Section 5: Automating Applications with XHR

### Introduction to working with XHR

_XMLHttpRequest (XHR) is an API in the form of an object whose methods transfer data between a web browser and a web server. The object is provided by the browser's JavaScript environment. Particularly, retrieval of data from XHR for the purpose of continually modifying a loaded web page is the underlying concept of Ajax design. Despite the name, XHR can be used with protocols other than HTTP and data can be in the form of not only XML,[1] but also JSON,[2] HTML or plain text.[3]_ - **Source: Wikipedia**

Cypress provide you access direct to the XHR obj, enabling you to make assertions about its properties. Additionally you can even stub and mock a request's response.

##### Don’t Stub Responses

By not stubbing your responses, you are writing true end-to-end tests. This means you are driving your application the same way a real user would. These typically include user login, signup, or other critical paths such as billing.

> How to start XHR?

- Start the server `cy.server()`;
- Start a routing

### Working with XHR and asserting using explicit assertion

> **Note:** For this particular lesson I built a `MEANapp` so you might need to install few things before starting.


