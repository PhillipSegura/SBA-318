const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const foundComments = await Comment.find({});
      res.status(200).json(foundComments);
    } catch (err) {
      res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    try {
      const createdComment = await Comment.create(req.body);
      res.status(200).redirect("/api/comments");
    } catch (err) {
      res.status(400).send(err);
    }
  });

router.get("/seed", async (req, res) => {
  try {
    await Comment.create([
      {
        name: "Big Deadend",
        age: "30",
        location: "Mesa",
        style: "Krump",
      },
      {
        name: "King Charles",
        age: "31",
        location: "Phoenix",
        style: "Chicago Footwork",
      },

      {
        name: "Armani",
        age: "29",
        location: "West Phoenix",
        style: "Popping",
      },
    ]);
    res.status(200).redirect("/api/comments");
  } catch (err) {
    res.status(400).send(err);
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const foundComment = await Comment.findById(req.params.id);
      res.json(foundComment).status(200);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  .put(async (req, res) => {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      console.log(updatedComment);
      res.redirect(`/api/comments/${req.params.id}`);
    } catch (err) {
      res.send(err).status(400);
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      console.log(deletedComment);
      res.status(200).redirect("/api/comments");
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;
