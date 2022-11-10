const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Loading Model for Contact Page and 
const Contact = require('./models/contact.js');

// Loading Keys URI
const keys = require('./config/keys');

// installing body-parser middle-ware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Create port and connect server to MongoDB
mongoose.connect(keys.MongoURI,{
    useNewUrlParser : true
}).then(() =>{
    console.log('DataBase is connected');
}).catch((err) => {
console.log('Error');
});

const port = 3000;

// Setting template engine for View
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));


app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (_req,res) => {
 res.render('home');
});

app.get('/about',(_req,res) => {
    res.render('about');
})

app.get('/contact',(_req,res)=> {
 res.render('contact');
});

// handling POST route for contact
app.post('/contactme', (req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body));  // req.body = [Object: null prototype] { title: 'product' }
    console.log(obj);                                  // { title: 'product' } To check if data is parsed.
    const newContact = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email: req.body.email,
        message:req.body.message,
        date: new Date()
    }
    new Contact(newContact).save((err,contact) => {
        if (err) {
            throw err;
        }
        res.redirect('/success');
    });
});
app.get('/success',(req,res) => {
res.render('success'); 
});

app.listen(port,() => {
    console.log(`Successful, Server is up and running on ${port}`);
});
