import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const Signup = async (req, res) => {
    const {name,email,password,confirmPassword} = req.body;
    try {
       
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({newUser});
        }
        else{
            res.status(400).json({error: "Invalid User Data"});
        }
    } catch (error) {
        res.status(500).json({error: "Server Error"})
        console.log(error)
    }
};



export const Login = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                generateTokenAndSetCookie(user._id, res);
                res.status(200).json({user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    age: user.age,
                    weight: user.weight,
                    height: user.height,
                }});
            }
            else{
                res.status(400).json({error: "Invalid Credentials"});
            }
        }
        else{
            res.status(400).json({error: "Invalid Credentials"});
        }
    } catch (error) {
        res.status(500).json({error: "Server Error"})
        console.log(error)
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({message: "Logged Out"});
    } catch (error) {
        res.status(500).json({error: "Server Error"})
    }
};