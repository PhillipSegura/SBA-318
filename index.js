const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
