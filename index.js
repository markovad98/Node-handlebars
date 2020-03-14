const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 3001;

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
