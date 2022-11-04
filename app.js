const express = require('express');
const app = express();
const exphbs = require('express-handlebars');


//Create port
const port = 3002;

// Setting template engine for View
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));


app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (_req,res) => {
 res.render('home');
});

app.listen(port,() => {
    console.log(`Successful, Server is up and running on ${port}`);
});
