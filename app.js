const express = require('express');
const path = require('path');  
const app = express();
const mongoose = require("mongoose");
const UsersCreated = require("./Models/UsersCreated.js");
const cookieParser = require("cookie-parser");


require("dotenv").config();// alwys write this before using process.env
app.use(cookieParser());// used to parse cookies


mongoose.connect(process.env.MONGO_URL);


app.use(express.urlencoded({ extended: true })); //used to decode data send using html format
app.use(express.json()); // used to accept json fromat data
app.use(express.static(path.join(__dirname+'/public')));// use to tell server where the frontend is

// the below 3 get functions are for vercel to get the page when asked for it
app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname+'/public/Index.html'));
})
app.get('/contact.html',(req,res) =>{
    res.sendFile(path.join(__dirname+'/public/Contact.html'));
})
app.get('/index.html',(req,res) =>{
    res.sendFile(path.join(__dirname+'/public/Index.html'));
})

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


// used to login the user
app.post('/login', async (req, res) => {
    // mongoose.connect(process.env.MONGO_URL);
    const { username, password } = req.body;
    try {
        const user = await UsersCreated.findOne({ username, password });

        if (user) {
            res.json({ success: true, user : username });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.listen(process.env.PORT,()=>{
    console.log("running on port 3000");
})

