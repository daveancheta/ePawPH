import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"

export const signup = async (req, res) => {
    const { fullname, gender, email, password } = req.body;

    try {
        if (!fullname || !gender || !email || !password) {
            return res.status(400).json({ message: "All fields are requred" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Passowrd must be at least 6 characters" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: "Invalid email format" })
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" })


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            gender,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            const savedUser = await newUser.save()
            generateToken(savedUser._id, res)

            res.status(200).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                gender: newUser.gender,
                email: newUser.email,
            })
        }

    } catch (error) {
        console.error("Error signup controller:", error)
        res.status(500).json({ message: 'Inertal server error' })
    }

}