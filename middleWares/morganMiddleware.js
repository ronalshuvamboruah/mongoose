// const morgan = require("morgan");
// const logger = require("../utils/logger");
// ​
// // const stream = {
// //   // Use the http severity
// //   write: (message) => logger.http(message),
// // };
// ​
// // const skip = () => {
// //   const env = process.env.NODE_ENV || "development";
// //   return env !== "development";
// // };
// ​
// const morganMiddleware = morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, 'content-length'), '-',
//       tokens['response-time'](req, res), 'ms'
//     ].join(' ')
//   })
// // morgan(
// //   // Define message format string (this is the default one).
// //   // The message format is made from tokens, and each token is
// //   // defined inside the Morgan library.
// //   // You can create your custom token to show what do you want from a request.
// //   ":remote-addr :method :url :status :res[content-length] - :response-time ms",
// //   // Options: in this case, I overwrote the stream and the skip logic.
// //   // See the methods above.
// //   { stream, skip }
// // );
// ​
// module.exports = morganMiddleware;