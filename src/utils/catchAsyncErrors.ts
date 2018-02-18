/**
 * Wraps express router functions with an error handler. Meant to be used with asynchronous
 * methods that return a promise. This function will execute the function and attach an exception
 * handler in the case that the promise returned by the 'wrapped' function is rejected.
 * See index.ts file where the server configuration is hosted and where the server is started to 
 * 
 */
export function catchAsyncErrors(func) {
  return (req, res, next) => {
    // Keep a reference to the returned promise object returned by the wrapped function.
    const promise = func(req, res, next);
    // Attach a catch to the promise so that if it is rejected we can catch the error and handle it in the /index.ts file.
    if (promise && promise.catch) {
      promise.catch(err => next(err));
    }
  }
}