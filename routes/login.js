const express = require("express");
const UserMaster = require("../modals/userMaster");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExit = await UserMaster.findOne({ email });
    if (!userExit) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const user = await bcrypt.compare(password, userExit.password);

    if (user) {
      res.status(200).json({
        message: "Login Successfully",
        token: await userExit.generateToken(),
        userID: userExit._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("internal server error.");
  }
});

module.exports = router;
