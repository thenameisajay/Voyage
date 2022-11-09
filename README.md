# ServerApp



 Tools Used : 
  Node Js 
  Microsoft Visual Code
  git
  
  Server is built using Express Module. ( MacOS : -npm install express --save) (API Reference : https://expressjs.com/en/4x/api.html)
  
   Express Handlebars : This view engine uses sensible defaults that leverage the "Express-way" of structuring an app's views. This makes it trivial to use in basic apps: (npm install express-handlebars)
    Basic Usage -
           Directory Structure:
                                 .
                                 ├── app.js
                                 └── views
                                     ├── home.handlebars
                                     └── layouts
                                         └── main.handlebars



Nodemon :  A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. (Installation : npm install -g nodemon ) (Usage : >> <nodemon> in main directory / nodemon [your node app]) (Website :
https://www.npmjs.com/package/nodemon)

Body-parser : Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
(Installation : $ npm install body-parser) (Website : https://www.npmjs.com/package/body-parser)

API REFERENCE : 
const bodyParser = require('body-parser')

.JS usage : 
// parse application/x-www-form-urlencoded
   app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
   app.use(bodyParser.json())
   
   Code Snippets in app.js : 
   // Start of Code 
   
   //handle POST route for contact 
app.post('/contactme', (req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body));  // req.body = [Object: null prototype] { title: 'product' }
    console.log(obj); // { title: 'product' }
});
   // End of Code
   
  Moongose Module : Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
  (Website : https://mongoosejs.com)
  
  Installation : $ npm install mongoose --save
  
  API REFERENCE IN .JS : 
  const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

SCHEMA USAGE : 
const kittySchema = new mongoose.Schema({
  name: String
});

CODE USAGE EXAMPLE :  (Contact.js)
     
// BEGIN CODE 
const contactSchema = new Schema ({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type:String
    },
    message: {
        type:String
    },
    date: {
        type: Date,
        default: Date.now
    }
    // END CODE
  
  
