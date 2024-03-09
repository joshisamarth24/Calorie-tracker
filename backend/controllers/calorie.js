import Calorie from "../models/calorie.js";
import moment from "moment";

export const CalorieIntake = async (req, res) => {
    const {id} = req.params;
    const {date,calories} = req.body;
    try {
        const newCalorie = new Calorie({
            userId: id,
            date: date,
            calories: calories
        });
        await newCalorie.save();
        res.status(201).json({newCalorie});

    } catch (error) {
        res.status(500).json({error: "Server Error"});
        console.log(error)
    }
}

export const getWeeklyCalorieIntake = async (req, res) => {
    const { id } = req.params;
    try {
        const startOfWeek = moment().startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();

        const weeklyCalories = await Calorie.find({
            userId: id,
            date: { $gte: startOfWeek, $lte: endOfWeek }
        });

        let totalCalories = 0;
        let n = 0;
        weeklyCalories.forEach((calorie) => {
            totalCalories += calorie.calories;
            n++;
        });
        const averageCalories = totalCalories / n;

        res.status(200).json({ weeklyCalories,totalCalories,averageCalories });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
        console.log(error);
    }
};
