### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callbacks: A fucntion that is passed into another function as as argument to be excuted later.
Promise: Object reps the eventual completion or failure of an asynch operation. It allows you to attach callbacks instead of passing the. You can chain them with .then(), .catch(), .finally() for successive async.
Async/Await: An async function returns a Promise, and await is used to pause the execution until the Promise is resolved.



- What is a Promise?
Object reps the eventual completion or failure of an asynch operation. It allows you to attach callbacks instead of passing the. You can chain them with .then(), .catch(), .finally() for successive async


- What are the differences between an async function and a regular function?
Async function: Will always return a promise if the function returns a value that is not a proimse it will a automatically be wrapped into a promise. Can use the await keyword to pause the execuction of the async function. Async are best suited to perform asynch task especially when dealing with promises.
Regualr function: Returns whatever value in specified in the return statment. Can not use the await keyword to use promises. Ideal for all other synch functions that can be completed without waiting for other operations to be complete.

- What is the difference between Node.js and Express.js?
Node.js is a runtime env as for Express.js is a framework that runs within Node.js. Node can be executed in JavaScript code outside of the browser for developing server side apps. Where as Express is specifically designed to build web apps and apis more easly within Node. Node is set to provide the basic needed for server side development as where as Express offers features for web and app development such as Middleware,Routing,Templates.

- What is the error-first callback pattern?
It's a style of callback functions where the first argument of the callback function is reserved for an error object, and the subsequent arguments are used for successful response data.

- What is middleware? 
Middleware is a function that runs between receiving the request and sending the response in your application's workflow. It can modify the request, the response, or end the request-response cycle by sending a response early.

- What does the `next` function do?
Used to pass control the next middleware function in the stack, if its not called the request will hang and not proceed to the next middleware or route handler.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
The code has a few issues related to performance, structure and naming conventions.
Peformance: The code fetches data sequentially instead of asynch. We could cut the time to fetch all the user data by using Promise.all.
Structure: Haroding the Usernames reduces its flexiblity and resuability the better thing to do would be to pass usernames as parmeters to the function. The function also lacks Error handeling which could be an issue if we ran into complications and could be fixed by using 
catch().
Naming: The variable names are specific usernames which is not scalable or desript enough for variable naming. A more generic naming convention or directly returning the fetched data without assigning it to variables would be better.

<!-- async function getUsers(usernames) {
  try {
    const promises = usernames.map(username =>
      $.getJSON(`https://api.github.com/users/${username}`)
    );
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    // Handle errors, possibly returning an error message or logging
    console.error("Error fetching user data:", error);
    throw error; // Or handle it as needed
  }
}

// Usage
getUsers(['elie', 'joelburton', 'mmmaaatttttt'])
  .then(users => console.log(users))
  .catch(error => console.error(error));
 -->