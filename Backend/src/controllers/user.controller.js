import { User } from "../models/user.models.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { BlackListToken } from "../models/blackList.model.js";

const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname || "",
            email,
            password,
        });

        const token = user.generateAuthToken();
        res.status(201).json({
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const loginUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isPassworValid = await user.comparePassword(password);

    if (!isPassworValid) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({ token, user, message: "user logged in successfully" });
}
const getUserProfile = async (req, res) => {
    return res.status(200).json({ user: req.user });
}
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlackListToken.create({ token });

    res.status(200).json({ message: "Logged out successful." });
}

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
};