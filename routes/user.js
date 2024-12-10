const express = require("express");
const UserMaster = require("../modals/userMaster");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log(req.body, "main");

    const existingUser = await UserMaster.findOne({
      $or: [{ email: req.body.email }, { number: req.body.number }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or Number already exists in the system." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new UserMaster({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User added successfully.",
      token: await newUser.generateToken(),
      userID: newUser._id.toString(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    let {} = req.query;
    let match = {};
    let user = await UserMaster.find(match);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
