import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized request." });
    }

    const isBlackListed = await User.findOne({ token: token });

    if (isBlackListed) {
        return res.status(401).json({ message: "Unauthorized request." });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized request." });
    }
}

export {
    authUser,
}