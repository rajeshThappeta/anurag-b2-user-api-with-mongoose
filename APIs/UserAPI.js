//create min-express app(Seperate route)
import exp from "express";
import { UserModel } from "../models/UserModel.js";
import {hash} from 'bcryptjs'
export const userApp = exp.Router();

//DEFINE USER REST API Routes
//Create new User
userApp.post("/users", async (req, res) => {
  //get new user obj from req
  const newUser = req.body;
  //hash the password
  const hashedPassword=await hash(newUser.password,10)
  //replace plain password with hashed password
  newUser.password=hashedPassword;
  //Create new user document
  const newUserDocument = new UserModel(newUser);
  //save
  const result = await newUserDocument.save();
  console.log("result :", result);
  //send res
  res.status(201).json({ message: "User created" });
});

//Read all users
userApp.get("/users", async (req, res) => {
  //read all users from db
  let usersList = await UserModel.find();
  //send res
  res.status(200).json({ message: "users", payload: usersList });
});

//Read a User by ObjectID
userApp.get("/users/:id", async (req, res) => {
  //Read object id from req params
  const uid = req.params.id;
  //find user by id
  const userObj = await UserModel.findById(uid);
  //if user not found
  if (!userObj) {
    return res.status(404).json({ message: "User not found" });
  }
  //send res
  res.status(200).json({ message: "user", payload: userObj });
});

//Update a User by id
userApp.put("/users/:id", async (req, res) => {
  //get modified user from req
  const modifiedUser = req.body;
  const uid = req.params.id;

  //find user by id & update
  const updatedUser = await UserModel.findByIdAndUpdate(
    uid,
    { $set: { ...modifiedUser } },
    { new: true,runValidators:true},
  );
  //send res
  res.status(200).json({ message: "User modified", payload: updatedUser });
});

//delete user by id
userApp.delete("/users/:id", async (req, res) => {
  //get id from req params
  let uid = req.params.id;
  //find & delete user by id
  let deletedUser = await UserModel.findByIdAndDelete(uid);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  //send res
  res.status(200).json({ message: "user removed", payload: deletedUser });
});


// User created   === "User  created" -->false
// 200 -- success
// 201 -- created
// 400 -- bad request
// 401 -- Unauthorised
// 404 -- Not found
// 500 -- Server error
