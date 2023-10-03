const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken } = require("../controller/jwtController");
const { checkExistingEmail } = require("../middleware/emailDuplikate");
const { emailFormat } = require("../middleware/emailValidation");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
};

exports.createUser = async (req, res) => {
  try {
    await checkExistingEmail(req, res);
    await emailFormat(req, res);

    const newUser = req.body;
    const hashedPassword = await hashPassword(newUser.password);
    newUser.password = hashedPassword;
    const user = await User.create(newUser);
    const token = createToken({ userId: user._id });
    res.status(201).json({ user, token });
    console.log("Benutzer erstellt:", user);
    console.log("Token erstellt:", token);
  } catch (error) {
    console.error("Fehler beim Erstellen des Benutzers:", error);
  }
};

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send("Error fetching user");
  }
};

exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send("User deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting user");
  }
};
