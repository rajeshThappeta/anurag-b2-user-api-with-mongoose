//Create express app
import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./APIs/UserAPI.js";
const app = exp();
//add body parser
app.use(exp.json());
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
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});

//error => {name,message,callstack}
