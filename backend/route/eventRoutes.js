const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();
const eventModel = require("../model/eventModel");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const checkScopes = require("./utility");

module.exports = router;

const dataBaseUrl = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(dataBaseUrl);
const dataBaseName = "ticket-shop";

var storage = new GridFsStorage({
  url: dataBaseUrl + dataBaseName,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-${file.originalname}`;
      return filename;
    }

    let extension = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );

    return {
      bucketName: "images",
      filename: `${Date.now()}${extension}`,
    };
  },
});
const upload = multer({ storage });

//Get all Events
router.get("/", async (req, res) => {
  try {
    const data = await eventModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get Event by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin", "user"]),
  async (req, res) => {
    try {
      const data = await eventModel.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//Update Event by ID
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await eventModel.findByIdAndUpdate(
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

//Create new Event
// router.post('/',passport.authenticate('jwt', { session: false }), async (req, res) => {

//     const data = new eventModel({
//         eventName: req.body.eventName,
//         eventDescription: req.body.eventDescription,
//         eventDate: req.body.eventDate,
//         eventLocation: req.body.eventLocation,
//         eventImage: req.body.eventImage

//     })

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({message: error.message})
//     }
// })

//Create new Event with images
router.post(
  "/",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin"]),
  async (req, res) => {
    const data = new eventModel({
      eventName: req.body.eventName,
      eventDescription: req.body.eventDescription,
      eventDate: req.body.eventDate,
      eventLocation: req.body.eventLocation,
      eventImage: req.file?.filename ?? "",
    });

    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

//get image
router.get("/image/:id", async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dataBaseName);
    const bucket = new GridFSBucket(database, {
      bucketName: "images",
    });

    let downloadStream = bucket.openDownloadStreamByName(req.params.id);

    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });

    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });

    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// const checkScopes = requiredScopes("admin");
//delete  Event
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkScopes.checkScopes(["admin"]),
  async (req, res) => {
    const { id } = req.params;

    try {
      const event = await eventModel.findByIdAndDelete(id);
      res.send(event);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);
