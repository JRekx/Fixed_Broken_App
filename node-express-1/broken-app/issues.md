# Broken App Issues


1. Asynchronous Data Handling
Problem: We were not waiting for the asynchronous axios.get calls to complete before attempting to access their data. This resulted in attempting to read properties of undefined, as the promises had not yet resolved.

Solution: We used Promise.all to wait for all the asynchronous operations to complete before proceeding to construct the output object. This ensures that all network requests finish and we have the data available to work with.

2. Error Handling in Asynchronous Code
Problem: The catch block was incorrectly set up, which could lead to unhandled promise rejections. Additionally, the err variable was not defined in the catch block, leading to a potential reference error.

Solution: We refined the error handling by correctly placing the try-catch block to effectively catch and handle any errors that might occur during the asynchronous operations or elsewhere in the route handler.

3. Middleware to Parse JSON Body Not Set Up
Problem: The application did not include middleware to parse the JSON body of incoming requests, meaning req.body would be undefined.

Solution: We added express.json() middleware to the application, which allows Express to parse incoming requests with JSON payloads. This is crucial for accessing req.body.developers.

