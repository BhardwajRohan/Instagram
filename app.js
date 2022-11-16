require('dotenv').config()
const express = require('express');
const bodyPareser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');



const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyPareser.urlencoded({extended: true}));

//Database Connection below :

const user = process.env.DB_USER;
const pass = process.env.DB_SECURITY;
const url = `mongodb+srv://${user}:${pass}@instagram1.f5oh9pz.mongodb.net/?retryWrites=true&w=majority`
const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Instagram1';

mongoose.connect(mongodbURI)
.then(() => {
    // console.log("Database successfuly connected...");
})
.catch((e) => {
    // console.log("error occurd while conneting the database" + e);
})

//Database Schema defination : 
const InstaSchema  = new mongoose.Schema({
    user : {
        type : String,
        required : true, 
        trim : true
    },
    password : {
        type : String,
        required : true, 
        trim : true

    }
});

//Schema Model defination : 

const User = mongoose.model('User', InstaSchema);

//work done!



app.get("/", function(req, res){
    res.render('index');
})


app.post("/", async(req, res) => {

    try{

        const MyUsername = req.body.username;
        const MyPassword = req.body.password;
    
        // console.log(MyUsername);
        // console.log(MyPassword);

        const myUser = new User ({
            user : MyUsername,
            password : MyPassword

        })    
    
        const userData = await myUser.save();
        // console.log(userData);
    

        const alt = "The username you entered doesn't belong to an account. Please check your username and try again."
        // res.redirect("/");
        res.render('index2', {altt : alt});




    }
    catch(error){
        // console.log("Occured error while submitting the data " + error);
    }


    
})


app.listen(PORT, () => {
    // console.log(`server is running on port 3000`);

})