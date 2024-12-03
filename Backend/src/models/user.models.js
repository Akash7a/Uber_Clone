import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required: true,
                minlength: [3, 'First name must be at least 3 characters long'],
            },
            lastname: {
                type: String,
                minlength: [3, 'Last name must be at least 3 characters long'],
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, "Email must be at least 3 characters long"],
        },
        password: {
            type: String,
            required: true,
        },
        socketId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            const saltRounds = 10; 
            this.password = await bcrypt.hash(this.password, saltRounds);
        } catch (error) {
            return next(error); 
        }
    }
    next();
});

userSchema.methods.generateAuthToken = function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.AUTH_TOKEN_SECRET);
        return token;
    } catch (error) {
        console.error("Error generating auth token:", error);
        throw new Error("Token generation failed");
    }
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);