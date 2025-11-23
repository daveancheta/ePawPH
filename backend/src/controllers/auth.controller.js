import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import { faker } from "@faker-js/faker"

export const signup = async (req, res) => {
    const { fullname, gender, email, password } = req.body;

    const fullnameLength = fullname.length;
    const defaultUsername = "user" + faker.number.int() + fullnameLength;
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
            username: defaultUsername,
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
                username: newUser.username,
                gender: newUser.gender,
                email: newUser.email,
            })
        }

    } catch (error) {
        console.error("Error signup controller:", error)
        res.status(500).json({ message: 'Inertal server error' })
    }
}

export const login = async (req, res) => {
    const { identifier, password } = req.body

    try {
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        })

        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            gender: user.gender,
            email: user.email,
            profile: user.profile
        })

    } catch (error) {
        console.error("Error login controller:", error)
        res.status(500).json({ message: 'Inertal server error' })
    }
}

export const logout = async (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logout succesfully" })
}