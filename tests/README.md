# 📖 General Testing guidelines

This document was made to gather the knowledge regarding testing in JavaScript. Feel free to use it for your needs or to edit.

## Adding tests

### What is the Unit Test?

Unit Tests are conducted by developers and test the unit of code( aka module, component) he or she developed. It is a testing method by which individual units of source code are tested to determine if they are ready to use. It helps to reduce the cost of bug fixes since the bugs are identified during the early phases of the development lifecycle.

### What is Integration Test?

Integration testing is executed by testers and tests integration between software modules. It is a software testing technique where individual units of a program are combined and tested as a group. Test stubs and test drivers are used to assist in Integration Testing. Integration test is performed in two way, they are a bottom-up method and the top-down method.

### Unit test vs Integration tests

As explain before the idea of using Unit Test its to review a single unit of code, and it should be focused on a specific result we are trying to understand.
Integration testing is for multiple methods or flows that we are triying to confirm that work as expected. Integrations testing are also required when interacting with more than one component such as DB + APP.

Examples:

| Mehtod                                    | Where it should be added                                                            |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| PDFService.createDocumentFromString(str); | Since it's not interacting with other components this could be added as Unit Test   |
| PDFService.createDocuentAndSave(str);     | Integration testing will be necessary to verify that the result is also saved in DB |

### How to create a test

To create a test just find the corresponding module that you are going to test, i.e. `Models` this will be available in `tests/integration/models`.
On the directory create a test with the format of `NAME.MODULE.test.ts`. Where _module_ is the module we have added, and _name_ is the class name, i.e. `user.model.test.ts`
Imports are not necessary by default you can just start describing your tests are it is.

## Guidelines

### The goal of these guidelines is to make your tests:

- Readable
- Maintainable
- Trustworthy

### Unit tests are not for finding bugs!!!

| Goal                                                                                  | Strongest technique                                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Finding bugs (things that don’t work as you want them to)                             | Manual testing (sometimes also automated integration tests)                        |
| Detecting regressions (things that used to work but have unexpectedly stopped working | Automated integration tests (sometimes also manual testing, though time-consuming) |
| Designing software components robustly                                                | Unit testing (within the TDD process)                                              |

### Testing Best Practices

1. **Always Write Isolated Test Cases**  
   The order of execution has to be independent between test cases.

2. **Test One Thing Only in One Test Case**  
   If a method has several end results, each one should be tested separately.
   Whenever a bug occurs, it will help you locate the source of the problem.

```javascript
it('should send the data to the server', () => {
  // expect(...)to(...);
});

it('should update the view properly', () => {
  // expect(...)to(...);
});
```

Be aware that writing "AND" or "OR" when naming your test are a bad practice

3. **Describe your tests properly**  
   This helps to avoid comments and increases the maintainability and in the case a test fails you know faster what functionality has been broken. Keep in mind that someone else will read it too.
   Tests can be the live documentation of the code.

In order to help you write test names properly, you can use the "unit of work - scenario/context - expected behaviour" pattern:

```javascript
describe('[unit of work]', () => {
  describe('when [scenario/context]', () => {
    it('should [expected behaviour]', () => {});
  });
});
```

4. **Use the Arrange-Act-Assert Style**

5. **Don't Forget to Refactor the Test Code**
   Also maintain your test code (especially when after refactoring the code under test).

6. **Limit Use of Mocks**  
   In some cases absolutely necessary, but with better design stubs should be enough.  
   _Mocks vs stubs_  
   _Mock_ objects are used to define _expectations_ i.e: In this scenario I expect method A() to be called with such and such parameters.Mocks record and verify such expectations.
   _Stubs_, on the other hand have a different purpose: they do not record or verify expectations, but rather allow us to _“replace”_ the behavior, state of the “fake” object in order to utilize a test scenario.

7. **Avoud logic in tests**

```javascript
it('should sanitize a string containing non-ASCII chars', () => {
  expect(sanitizeString('Avi' + String.fromCharCode(243) + 'n')).toEqual(
    'Avion'
  );
});
```

8. **Don't write unnecessary expectations**  
   Remember, unit tests are a design specification of how a certain behaviour should work, not a list of observations of everything the code happens to do.

9. **Cover the general case and the edge cases**
   "Strange behaviour" usually happens at the edges...
   Remember that your tests can be the live documentation of your code.

10. **Test the behaviour, not the internal implementation**
    **:(**

```javascript
it('should add a user in memory', () => {
  userManager.addUser('Dr. Falker', 'Joshua');

  expect(userManager._users[0].name).toBe('Dr. Falker');
  expect(userManager._users[0].password).toBe('Joshua');
});
```

A better approach is to test at the same level of the API:

**:)**

```javascript
it('should add a user in memory', () => {
  userManager.addUser('Dr. Falker', 'Joshua');

  expect(userManager.loginUser('Dr. Falker', 'Joshua')).toBe(true);
});
```

_Advantage_:
Changing the internal implementation of a class/object will not necessarily force you to
refactor the tests

_Disadvantage_:
If a test is failing, we might have to debug to know which part of the code needs to be fixed.
Here, a balance has to be found, unit-testing some key parts can be beneficial.

11. **Create new tests for every defect**  
    Whenever a bug is found, create a test that replicates the problem before touching any code. From there, you can apply TDD as usual to fix it.

12. **Use factory functions when possible**

Factories can:

- help reduce the setup code, especially if you use dependency injection
- make each test more readable, since the creation is a single function call that can be in the test itself instead of the setup
- provide flexibility when creating new instances (setting an initial state, for example)

There's a trade-off to find here between applying the DRY principle and readability.

**:(**

```js
describe('User profile module', () => {
  let profileModule;
  let pubSub;

  beforeEach(() => {
    const element = document.getElementById('my-profile');
    pubSub = new PubSub({ sync: true });

    profileModule = new ProfileModule({
      element,
      pubSub,
      likes: 0
    });
  });

  it('should publish a topic when a new "like" is given', () => {
    spyOn(pubSub, 'notify');
    profileModule.incLikes();
    expect(pubSub.notify).toHaveBeenCalledWith('likes:inc', { count: 1 });
  });

  it('should retrieve the correct number of likes', () => {
    profileModule.incLikes();
    profileModule.incLikes();
    expect(profileModule.getLikes()).toBe(2);
  });
});
```

**:)**

```js
describe('User profile module', () => {
  function createProfileModule({
    element = document.getElementById('my-profile'),
    likes = 0,
    pubSub = new PubSub({ sync: true })
  }) {
    return new ProfileModule({ element, likes, pubSub });
  }

  it('should publish a topic when a new "like" is given', () => {
    const pubSub = jasmine.createSpyObj('pubSub', ['notify']);
    const profileModule = createProfileModule({ pubSub });

    profileModule.incLikes();

    expect(pubSub.notify).toHaveBeenCalledWith('likes:inc');
  });

  it('should retrieve the correct number of likes', () => {
    const profileModule = createProfileModule({ likes: 40 });

    profileModule.incLikes();
    profileModule.incLikes();

    expect(profileModule.getLikes()).toBe(42);
  });
});
```

### Style

1. Alignment

```javascript
It('should do something', () => {
  //code
});
```

### 📙 Best practices

- Roy Osherove - "JS Unit Testing Good Practices and Horrible Mistakes": https://www.youtube.com/watch?v=iP0Vl-vU3XM
- Steven Sanderson - "Writing Great Unit Tests: Best and Worst Practices": http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/
- Rebecca Murphy - "Writing Testable JavaScript": http://alistapart.com/article/writing-testable-javascript
- YUI Team - "Writing Effective JavaScript Unit Tests with YUI Test": http://yuiblog.com/blog/2009/01/05/effective-tests/
- Colin Snover - "Testable code best practices": http://www.sitepen.com/blog/2014/07/11/testable-code-best-practices/
- Miško Hevery - "The Clean Code Talks -- Unit Testing": https://www.youtube.com/watch?v=wEhu57pih5w
- José Armesto - "Unit Testing sucks (and it’s our fault)": https://www.youtube.com/watch?v=GZ9iZsMAZFQ
- TDD - From the Inside Out or the Outside In?: https://8thlight.com/blog/georgina-mcfadyen/2016/06/27/inside-out-tdd-vs-outside-in.html
- Based on: https://raw.githubusercontent.com/mawrkus/js-unit-testing-guide/master/README.md
