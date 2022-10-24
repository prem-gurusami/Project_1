const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser:true});

const userSchema = new mongoose.Schema({
    fName:String,
    lName:String,
    email:String,
    password:String,
    phone:Number
});
let newUser=[];
let loginUser='';
const User = mongoose.model("User",userSchema);

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("Login",{});
});

app.post("/",function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    console.log(email+" "+password); 

    User.findOne({email:email},function(err,lUser){
        if(err){
            console.log(err);
        }else{
            //console.log(lUser);
            lUser;
            if(lUser.email == email && lUser.password == password){
                loginUser = lUser.fName;
                res.redirect("/home");
            }
        }
    });
    
    

});

app.get("/register",function(req,res){
    res.render("Register",{});
});

app.post("/register",function(req,res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    var phone = req.body.phone;
    let flag=false;
    
    User.findOne({email:email},function(err,lUser){
        if(err){
            console.log(err);
        }else{
            //console.log(lUser);
            if(lUser.email == email){
                console.log(lUser.email);
                console.log(email);
                flag = true;
                
            }
            console.log(flag+" "+"before");
    
        newUser = [{
            fName:fName,
            lName:lName,
            email:email,
            password:password,
            phone:phone
        }]
    
        
    console.log(flag);
    if(flag === false){
        User.insertMany(newUser,function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Created new user in db");
            }
        })
    }
    res.redirect("/");
        }
    });
    
    
});

app.get("/home",function(req,res){
    res.render("Home",{fName:loginUser});
})
 
















app.listen(3000,function(){

    console.log("Server is running in port 3000");
});