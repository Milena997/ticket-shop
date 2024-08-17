const express = require("express");
const router = express.Router();
const passport = require("passport");

const userModel = require("../model/userModel");
const checkScopes = require("./utility");

module.exports = router;

//Get all Users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin"]),
  async (req, res) => {
    try {
      const data = await userModel.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//Get User by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin", "user"]),
  async (req, res) => {
    const accountId = req.params.id;
    try {
      const data = await userModel.findOne({ accountId: accountId });
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//Update User by ID
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin", "user"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await userModel.findByIdAndUpdate(
        id,
        updatedData,
        options
      );

      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

//Create new User
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin"]),

  async (req, res) => {
    const accountId = req.params.id;

    const data = new userModel({
      name: req.body.name,
      lastName: req.body.lastName,
      dateOfBirth: new Date(req.body.dateOfBirth).toString(),
      location: req.body.location,
      accountId: accountId,
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

//delete  User
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin"]),
  async (req, res) => {
    const { id } = req.params;

    try {
      const user = await userModel.findByIdAndDelete(id);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);
