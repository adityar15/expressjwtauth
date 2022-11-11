const bcrypt = require("bcrypt");

const { connect } = require("../dbconfig");
const { User } = require("../models/User");
const { userResponseParser } = require("../parser/userResponseParser");
const { JWTController } = require("./JWTController");
const { UserController } = require("./UserController");

exports.HomeController = {
  async register(req, res) {
    await connect();

    let user = await UserController.getUserByEmail(req.body.email);

    if (user)
      return res
        .status(400)
        .json({ errors: { msg: "User account already exists" } });

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      contact: req.body.contact,
    });

    const token = JWTController.createToken({email:user.email}, true)

    res.cookie("refresh_token", token.refresh_token, {
        expires: new Date(Date.now() + 30 * 24 * 360000),
        httpOnly: true,
      });

    res.send({...userResponseParser(user), access_token: token.access_token});
  },
  async login(req, res) {
    await connect();

    let user = await UserController.getUserByEmail(req.body.email);

    if (!user)
      return res.status(404).json({ errors: { msg: "Please register" } });

    if (bcrypt.compareSync(req.body.password, user.password))
    {
        const token = JWTController.createToken({email:user.email}, true)

        res.cookie("refresh_token", token.refresh_token, {
            expires: new Date(Date.now() + 30 * 24 * 360000),
            httpOnly: true,
          });
          res.send({...userResponseParser(user), access_token: token.access_token});
    }

    else res.status(400).json({ errors: { msg: "Incorrect password" } });
  },
};
