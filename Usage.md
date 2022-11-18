# Voyage - `GUI Messenger WEBAPP DESIGNED FOR CS4203 - COMPUTER SECURITY



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
  
  MongoDB Cloud :  (Website : http://mongodb.com)
  
  Usage : Free Cluster hosted on top of Amazon Web Services 
  
  <img width="1130" alt="Screenshot 2022-11-09 at 1 15 58 pm" src="https://user-images.githubusercontent.com/113372062/200842005-a2d99320-5f2e-4ba1-8506-34cac1cbbf3f.png">
  
<img width="911" alt="Screenshot 2022-11-09 at 1 16 39 pm" src="https://user-images.githubusercontent.com/113372062/200842077-f4b5cb57-6c3e-4d2f-8b62-cc09a0ad391e.png">

<img width="911" alt="Screenshot 2022-11-09 at 1 17 38 pm" src="https://user-images.githubusercontent.com/113372062/200842097-2e72daeb-b269-4347-8c79-1902d182d2fc.png">


<img width="765" alt="Screenshot 2022-11-09 at 1 52 56 pm" src="https://user-images.githubusercontent.com/113372062/200847981-3166e2fd-ef80-4cdd-89c2-f5db70f78301.png">


Benefits : // Edit later , work on this..
End to End Encryption in-built
https://www.exoplatform.com/blog/exo-platform-chat-application-why-mongodb-team-collaboration-software/
https://www.mongodb.com/docs/manual/security/

Connection string into the application code CREATING A CLUSTER (I.E VOYAGE CLUSTER) :

mongodb+srv://Voyage:<password>@voyage.grm4x9n.mongodb.net/?retryWrites=true&w=majority


Passport.JS Middleware Usage : 


Facebook Oauth :(Installation : npm install passport-facebook) (Usage : https://www.passportjs.org/packages/passport-facebook/)

Google Oauth :  (Installation:npm install passport-google-oauth20) ( Usage: https://github.com/jaredhanson/passport-google-oauth2)
  
