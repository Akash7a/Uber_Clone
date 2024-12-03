import { User } from "../models/user.models.js";


const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error("All fields are required.");
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email is already registered." });
    }

    const user = await User.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });
    return user;
};

export {
    createUser,
}