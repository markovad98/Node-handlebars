const { Router } = require("express");
const Courses = require("../models/Course");
const router = Router();

router.get("/", async (req, res) => {
  const courses = await Courses.getAll();
  res.render("courses", {
    title: "Courses",
    isCourses: true,
    courses
  });
});

router.get("/:id", async (req, res) => {
  const course = await Courses.getById(req.params.id);
  res.render("course", {
    course,
    layout: "empty",
    title: `Курс: ${course.title}`
  });
});

router.get("/:id/edit", async (req, res) => {
  const course = await Courses.getById(req.params.id);
  if (!req.query.allow) {
    res.redirect("/");
  } else {
    res.render("courseEdit", {
      course,
      title: `Редактировать курс ${course.title}`
    });
  }
});

router.post("/edit", async (req, res) => {
  await Courses.update(req.body);
  res.redirect("/");
});

module.exports = router;
