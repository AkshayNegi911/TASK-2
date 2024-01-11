const express = require('express');
const session = require('express-session');
const path = require('path');  
const app = express();
const mongoose = require("mongoose");
const UsersCreated = require("./Models/UsersCreated.js");
const Session = require("./Models/Sessions.js");
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");


require("dotenv").config();// alwys write this before using process.env
app.use(cookieParser());// used to parse cookies

// Set up express-session middleware with MongoDB session store
mongoose.connect(process.env.MONGO_URL);

// app.use(session({
//     // this is the structure of our session
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         // this tells how and where sessions will be stored
//         mongoUrl: process.env.MONGO_URL,
//         collection: "sessions"
//      }),
//     cookie: {
//         maxAge: 60 * 60 * 1000, // Session expires in 1 hour (adjust as needed)
//         secure: false, // Set to true for HTTPS
//         httpOnly: true,
//     },
// }));
app.use(express.urlencoded({ extended: true })); //used to decode data send using html format
app.use(express.json()); // used to accept json fromat data
app.use(express.static(path.join(__dirname+'/frontend')));// use to tell server where the frontend is

// note : default url is "http://localhost:7261"


console.log(process.env.MONGO_URL);
// mongoose.connect(process.env.MONGO_URL);


// used to create users which is done by contact us page
app.post('/submit-form',async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { username , password} = req.body;
    
    try {
      const userRes = await UsersCreated.create({
                username , password ,
      });
    res.json({ success: true, message: 'Form data submitted successfully!' });
    } catch (e) {
      res.status(422).json(e);
    }
  })


// // In-memory user data (replace with a database in a real scenario)
// const users = [
//     { username: 'demo', password: 'password' },
//     // Add more users as needed
// ];

const activeSessions = [];

// used to login the user means to create a session
app.post('/login', async (req, res) => {
    // mongoose.connect(process.env.MONGO_URL);
    const { username, password } = req.body;
    try {
        const user = await UsersCreated.findOne({ username, password });

        if (user) {
            // when we send this post request then at that time id of the session will be our sessionId
            // req.session.save();// this stores the current session in DB
            res.json({ success: true, user : username });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// used to check whether user is logged in or not (i.e. session is present or not)
// app.get('/check-login', (req, res) => {
//     const sessionId = req.sessionID; // asks for current request session id
//     // console.log(req.query.sessionId + " this is req.query");
//     // Check if the session is active
//     const session = Session.findById(sessionId);

//     if (session) {
//         res.json({ loggedIn: true, username: session.username ,message:sessionId});
//     } else {
//         res.json({ loggedIn: false });
//     }
// });

// app.get('/index', (req, res) => {
//     const sessionId = req.query.sessionID;

//     // Check if the session is active
//     const session = Session.findById(sessionId);

//     if (session) {
//         // User is logged in, serve the index page
//         res.sendFile(path.join(__dirname, 'frontend', 'Index.html'));
//     } else {
//         // User is not logged in, redirect to the login page
//         res.redirect('/Login.html');
//     }
// });


// ... (previous code)

// post request made to logout of current session
// app.post('/logout', (req, res) => {
//     const sessionId = req.sessionID;

//     // Remove the session from activeSessions
//     Session.deleteOne({ _id: sessionId });
//     res.json({ success: true, message: 'Logout successful' });
// });

// ... (remaining code)


app.listen(3000,()=>{
    console.log("running on port 3000");
})

