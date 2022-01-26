const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const userSignUp = async (req, res) => {
    const {userName, userPassword} = req.body
    try {
        const hashedPassword = await bcrypt.hash(userPassword, 12)
        const newUser = await User.create({
            userName: userName,
            userPassword: hashedPassword
        })
        res.status(201).json({
            status: "success",
            message: "User successfully signup"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail"
        })
    }
}

const userLogin = async (req, res) => {
    const {userName, userPassword} = req.body
    try {
        const user = await User.findOne({userName: userName})
        if(!user){
           return res.status(400).json({
                status: "fail",
                message: "User not found."
            })
        }
        
        const isCorrect = await bcrypt.compare(userPassword,user.userPassword)
        if(isCorrect){
            res.status(200).json({
                status: "success",
                message: "User successfully logged in."
            })
        }else{
            res.status(400).json({
                status: "fail",
                message: "Incorrect user name or password."
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "fail"
        })
    }
}

module.exports = {
    userSignUp,
    userLogin
}