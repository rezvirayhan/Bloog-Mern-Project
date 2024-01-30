import User from "../models/user.modal.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.statue(400).json({ message: "All fields are required" });
    }
    const newUser = new User({
        username,
        email,
        password
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};