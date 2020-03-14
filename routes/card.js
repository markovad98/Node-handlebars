const { Router } = require("express");
const Course = require("../models/Course");
const Card = require("../models/Card");
const router = Router();

router.post("/add", async (req, res) => {
  const course = await Course.getById(req.body.id);
  await Card.add(course);
  res.redirect("/");
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Корзина",
    isCard: true,
    courses: card.courses,
    price: card.price
  });
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.remove(req.params.id);
  res.json(card);
});

module.exports = router;
