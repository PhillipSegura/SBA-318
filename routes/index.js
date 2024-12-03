const express = require("express");
const router = express.Router();
const comments = require("../data/comment");
console.log(comments);

// GET
router.get("/", (req, res) => {
  res.render("index", { title: "Home", comments });
});
router.get("/comments", (req, res) => {
  res.send(comments);
});

// POST
router.post("/register", (req, res) => {
  const { name, age, location, style } = req.body;
  const newComment = {
    id: comments.length + 1,
    name: name,
    age: age,
    location: location,
    style: style,
  };
  comments.push(newComment);
  res.redirect("/");
  console.log(newComment);
});

// DELETE
router.delete("/comments/:index", (req, res) => {
  const index = parseInt(req.params.index); // Parse the index from the request
  if (index >= 0 && index < comments.length) {
    comments.splice(index, 1); // Remove the comment from the array
    res.redirect("/"); // Redirect back to home page after deletion
  } else {
    res.status(404).send("Comment not found");
  }
});

// PUT
router.put("/comments/:index", (req, res) => {
  const index = parseInt(req.params.index); // Parse the index from the request
  if (index >= 0 && index < comments.length) {
    const updatedComment = {
      name: req.body.name,
      age: req.body.age,
      location: req.body.location,
      style: req.body.style,
    };
    comments[index] = updatedComment;
    res.redirect("/"); // Redirect back to home page after update
  } else {
    res.status(404).send("Comment not found");
  }
});

router.get("/comments/:index", (req, res) => {
  const index = parseInt(req.params.index);
  // Parse the index from the request
  res.render("modify", { comment: comments[index], index: index });
});

// PATCH
// router.patch("/comments/:index", (req, res) => {
//   const {} = req.body;
//   const index = comments.findIndex((comment) => comment.name === name);

//   if (index === -1) {
//     res.status(404).json({ error: "comment not found" });
//     return;
//   }

//   comments[index].age = age;
//   comments[index].location = location;
//   comments[index].style = style;

//   res.redirect("/index");
// });

// Query Parameters
router.get("/search", (req, res) => {
  const { age } = req.query;

  const filteredComments = comments.filter((comment) => comment.age === age);

  res.render("index", {
    title: "Search Results",
    comments: filteredComments,
  });
});

module.exports = router;
