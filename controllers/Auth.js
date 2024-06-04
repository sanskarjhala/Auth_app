const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { options } = require('../routes/user');
require('dotenv').config();

//signUp route handler
exports.signup = async (req,res) =>{
    try {

        //get data
        const {name,email,password ,role} = req.body;
        //check if existing user
        const existing = await User.findOne({email});

        //if user exist
        if(existing){
            return res.status(400)
            .json({
                success:false,
                message:"User already exist",
            })
        }

        //if user not exist means new user
        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password,10);
            
        } 
        catch(error){
            return res.status(500)
            .json({
                success:false,
                message:"error in hashing "
            })
        }

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        })

        return res.status(200)
        .json({
            success:true,
            message:"user created succesfully",
        })

    }
    catch(error){
        console.error(error);
        return res.status(500)
        .json({
            success:false,
            message:"Server error"
        })

    }
}

//login route handler
exports.login = async(req , res) => {
    try {
        
        //data fetch
        const {email, password } = req.body;
        //validation on email and password 
        if(!email || !password) {
            return res.status(400).json(
                {
                    success:false,
                    message:"please fill detail properly "
                }
            )
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not registered 
        if(!user){
            return res.status(401).json(
                {
                    success:false,
                    message:"user not registered"
                }
            )
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }

        //verify password and generte a JWT token
        if(await bcrypt.compare(password , user.password)){
            //password match
           let token = jwt.sign(payload , process.env.JWT_SECRET , { expiresIn:"2h"})

           user = user.toObject();
           user.token = token;
        //    console.log(user.password)
           user.password = undefined;
        //    console.log(user.password) 

           const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
           }

           res.cookie("token" , token , options).status(200).json(
            {
                success:true,
                token,
                user,
                message:"user logged in succesfully"
            }
           )
        }

        else {
            return res.status(403).json(
                {
                    success:false,
                    message:"incorrect password",
                }
            )
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success:false,
                message:"login failure ",
            }
        )
    }
}
