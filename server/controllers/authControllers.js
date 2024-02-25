const User = require('../models/user')
const {hashPassword,comparePasswords} = require('../helpers/auth')
const jwt = require('jsonwebtoken')


const test = (req, res) => {
    res.json('test is working')
}

// Register Endpoint
const registerUser = async (req,res) =>{
    try {
        const {name, email, password} = req.body
        // Check if name was entered
        if(!name){
            return res.json({
                error: 'name is required'
            })
        }
        // Check if password is good
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and must be at least 6 characters long'
            })
        }
        //Check email
        const exists = await User.findOne({email})
        if(exists){
            return res.json({
                error: "Email is taken already"
            })
        }

        const hashedPassword = await hashPassword(password)

        // Create User in Database
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

// Login Endpoint
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        // Check if User exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }
        // Check if passwords match
        const match = await comparePasswords(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err,token) =>{
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
        }
        if(!match){
            res.json({
                error: "Password do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req,res) => {
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{}, (err,user) => {
            if(err) throw(err)
            res.json(user)
        })
    }else{
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}