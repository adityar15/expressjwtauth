const express = require("express");
// const { init } = require("./dbconfig")

require("dotenv").config()

const app = express();

const { registerValidator } = require("./validators/registerValidator");
const { HomeController } = require("./controllers/HomeController");
const { loginValidator } = require("./validators/loginValidator");

const userRouter = require("./routes/userroutes")
const teamRouter = require("./routes/teamroutes")
const projectRouter = require("./routes/projectroutes");
const { JWTController } = require("./controllers/JWTController");

// init()
app.use(express.json());
app.use("/user" , JWTController.verifyAccessToken.bind(JWTController), userRouter)
app.use("/project" , JWTController.verifyAccessToken.bind(JWTController), projectRouter)
app.use("/team" , JWTController.verifyAccessToken.bind(JWTController), teamRouter)



app.get("/", (req, res) => {
  res.send({ message: "Hello you are all the best people" });
});

app.post(
  "/register",
  registerValidator,
  HomeController.register
);
app.post(
    "/login",
    loginValidator,
    HomeController.login
  );
  

app.get("/new_access_token", JWTController.grantNewAccessToken.bind(JWTController))

app.listen(3000, () => {
  console.log("server running great!");
});
