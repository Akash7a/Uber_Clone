import mongoose, { Schema } from "mongoose";

const userShema = Schema(
    {
        fullname: {
            firstname: {
                type: String,
                required:true,
            },
            lastname:{
                type:String,
            }
        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userShema);