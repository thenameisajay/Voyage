const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

// installing body-parser middle-ware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Create port
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

//handle POST route for contact
app.post('/contactme', (req,res) => {
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
    console.log(obj); // { title: 'product' }
});

app.listen(port,() => {
    console.log(`Successful, Server is up and running on ${port}`);
});
