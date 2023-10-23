const dotenv = require('dotenv');
const path = require('path');

// console.log("Current directory:", __dirname); 
// console.log(process.dotenv.env.NODE_ENV)

dotenv.config({
    path: path.resolve(__dirname, `../package.json/${process.env.NODE_ENV}`)
});



module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000
}