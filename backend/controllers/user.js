import User from "../models/user.js";

export const Update = async (req, res) => {
    const {age,gender,weight,height} = req.body;
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        const updatedUser = await User.findByIdAndUpdate(id,{
            age: age,
            gender: gender,
            weight: weight,
            height: height
        }
        ,{new: true});
        res.status(200).json({updatedUser});

    } catch (error) {
        res.status(500).json({error: "Server Error"});
    }
}