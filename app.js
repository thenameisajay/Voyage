const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


// Import function exported by newly installed node modules.
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


//Load  Passport Middleware for Facebook and Google
require('./passport/passport-facebook');
require('./passport/passport-google');

// Loading Model for Contact Page and User
const Contact = require('./models/contact');
const User = require('./models/user');
const Message = require('./models/message');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Passport Middleware
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

// Loading Helpers
const keys = require('./config/keys');
const {requireLogin,ensureGuest} = require('./helpers/auth');
const user = require('./models/user');
const message = require('./models/message');

// set Global variables for User
app.use((req,res,next) => {
    res.locals.user = req.user || null;
    next();
});

// Express static Files
app.use(express.static('client'));

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

//Handling route for Facebook Auth
app.get('/auth/facebook',
  passport.authenticate('facebook',{
    scope: 'email'
  }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

// Handling route for Google auth 
app.get('/auth/google',
passport.authenticate('google', {
    scope: ['profile']
}));

app.get('/auth/google/callback',
passport.authenticate('google', {
    failureRedirect: '/'
}),
function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
});


const port =  process.env.PORT || 6677;

// Setting template engine for View
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',

    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));


app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/',ensureGuest,(_req,res) => {
 res.render('home');
});

app.get('/profile',requireLogin,(req,res) => {
User.findById({_id:req.user._id})
.then((user) => {
    res.render('profile',{
        user:user
    })
})
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

app.get('/about',(_req,res) => {
    res.render('about');
})

app.get('/contact',(_req,res)=> {
 res.render('contact');
});

// handling POST route for contact
app.post('/contactme', ensureGuest,(req,res) => {
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
app.get('/inbox',ensureGuest,(req,res) => {
    Contact.find({})
    .then((contacts) => {
if(contacts) {
     res.render('contacts', {
        contacts:contacts
     });
} else {
    res.render('empty');
}
    });
});

app.get('/success',ensureGuest,(req,res) => {
res.render('success'); 
});

app.get('/users',requireLogin,(req,res) => {
    User.find({})
    .then((users) => {
        User.findOne({_id:req.user._id})
        .then((user) => {
            res.render('users',{
                users: users,
                user:user
            });
        })
    });
});
// Start the chat Process
app.get('/startChat/:id', (req, res) => {
    Message.findOne({sender:req.params.id,receiver:req.user._id})
    .then((message) => {
        if (message) {
            message.receiverRead = true;
            message.senderRead = false;
            message.save((err,message) => {
                if (err) {
                    throw err;
                }
                res.redirect(`/chat/${message._id}`);
            })
        }else{
            Message.findOne({sender:req.user._id,receiver:req.params.id})
            .then((message) => {
                if (message) {
                    message.senderRead = true;
                    message.receiverRead = false;
                    message.date = new Date();
                    message.save((err,message) => {
                        if (err) {
                            throw err;
                        }
                        res.redirect(`/chat/${message._id}`);
                    })
                }else{
                    const newMessage = {
                        sender: req.user._id,
                        receiver: req.params.id,
                        senderRead: true,
                        receiverRead: false,
                        date: new Date()
                    }
                    new Message(newMessage).save((err,message) => {
                        if (err) {
                            throw err;
                        }
                        res.redirect(`/chat/${message._id}`);
                    })
                }
            })
        }
    })
})
app.get('/chat/:id',(req,res) => {
    Message.findById({_id:req.params.id})
    .populate('sender')
    .populate('receiver')
    .populate('chats.senderName')
    .populate('chats.receiverName')
    .then((message) => {
        User.findOne({_id:req.user._id})
        .then((user) => {
            res.render('chatRoom', {
                message: message,
                user:user
            })
        })
    })
})

 app.post('/chat/:id',(req,res) => {
    Message.findOne({_id:req.params.id,sender:req.user._id})
    .populate('sender')
    .populate('receiver')
    .populate('chats.senderName')
    .populate('chats.receiverName')
    .then((message) => {
        if (message) {
            message.senderRead = true;
            message.receiverRead = false;
            message.date = new Date();
            const newChat = {
                senderName:req.user._id,
                senderRead:true,
                receiverName:message.receiver._id,
                receiverRead:false,
                date:new Date(),
                senderMessage:req.body.message
            }
        
            message.chats.push(newChat)
            message.save((err,message) => {
                if (err) {
                    throw err;
                }
            Message.findOne({_id:message._id})
            .populate('sender')
            .populate('receiver')
            .populate('chats.senderName')
            .populate('chats.receiverName')
            .then((message) => { 
                User.findById({_id:req.user._id})
                .then((user) => {
                    res.render('chatRoom', {
                    message:message,
                    user:user
                })
            })
            })
        })
            }
                 else {
                    Message.findOne({_id:req.params.id,receiver:req.user._id})
                    .populate('sender')
                    .populate('receiver')
                    .populate('chats.senderName')
                    .populate('chats.receiverName')
                    .then((message) => {
                        message.senderRead = false;
                        message.receiverRead = true;
                        message.date = new Date();
                        const newChat ={
                            senderName: message.sender._id,
                            senderRead:false,
                            receiverName: req.user._id,
                            receiverRead:true,
                            receiverMessage:req.body.message,
                            date:new Date()
                        }
                        message.chats.push(newChat)
                        message.save((err,message) => {
                            if (err) {
                                throw err;
                            }
                        Message.findOne({_id:message._id})
                        .populate('sender')
                        .populate('receiver')
                        .populate('chats.senderName')
                        .populate('chats.receiverName')
                        .then((message) => { 
                            User.findById({_id:req.user._id})
                            .then((user) => {
                                res.render('chatRoom', {
                                message:message,
                                user:user
                            })
                        })
                        })
                    })
                })
            }
        })
    })

app.listen(port,() => {
    console.log(`Successful, Server is up and running on ${port}`);
});
