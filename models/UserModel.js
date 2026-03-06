import { Schema, model } from "mongoose";

//Create User Schema(username,password,email,age)
const userSchema = new Schema(
  {
    //structure of User resource
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [4, "Min length of Username is 4 chars"],
      maxLength: [6, "Username size excced 6 chars"],
      
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
      unique: [true, "Email already existed"],
    },
    age: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

//Generate UserModel
export const UserModel = model("user", userSchema);
