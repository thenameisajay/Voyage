const express = require('express');
const app = express();

const port = 3001;

app.get('/', (_req,res) => {
 res.send('Hello World');
});

app.listen(port,() => {
    console.log(`Successful, Server is up and running on ${port}`);
});
