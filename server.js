//Create express app
import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
import cookieParser from "cookie-parser";
const app = exp();
//add body parser
app.use(exp.json());
//add cookie parser miidleware
app.use(cookieParser());
//forward req to UserAPP if path starts with /user-api
app.use("/user-api", userApp);

//connect to DB server
async function connectDB() {
  try {
    await connect("mongodb://localhost:27017/anuragdb2");
    console.log("DB connection success");

    //start server
    app.listen(4000, () => console.log("server on port 4000.."));
  } catch (err) {
    console.log("err in DB connection :", err);
  }
}

connectDB();

//error handling middleware
app.use((err, req, res, next) => {
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Error cause:", err.cause);
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});

//error => {name,message,callstack}
