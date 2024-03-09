import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            default: 0,
        },
        weight: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        gender: {
            type: String,
            default:""
        }
    },{timestamps: true}
)

const User = mongoose.model("User", userSchema);

export default User;