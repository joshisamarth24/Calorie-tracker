import mongoose from "mongoose";

const calorieSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date:{
        type: Date,
        unique: true,
        required: true
    },
    calories:{
        type: Number,
        required: true
    }
},{timestamps: true});

const Calorie = mongoose.model("Calorie", calorieSchema);

export default Calorie;