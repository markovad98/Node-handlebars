const express = require("express");
const exphbs = require("express-handlebars");
const homeRouter = require("./routes/home");
const coursesRouter = require("./routes/courses");
const addCourseRouter = require("./routes/addCourse");

const app = express();
const PORT = 3001;

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

// Регистрируем движок hbs
app.engine("hbs", hbs.engine);
// Сеттим зарегистрированный движок
app.set("view engine", "hbs");
// Указываем имя папки в которой хранятся шаблоны
app.set("views", "views");
// Указываем папку со статикой (Стили, картинки, скрипты)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/courses", coursesRouter);
app.use("/add", addCourseRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
