const router = require("express").Router();
const {
  models: { Plant },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (err) {
    next(err);
  }
});

router.get("/:plantId", async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    res.json(plant);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const plant = await Plant.create(req.body);
    res.json(plant);
  } catch (err) {
    next(err);
  }
});
//Does this need to be at a "/admindashboard" route that is only accessible by the admin? (question from Tues. 6/14 by Walker)

router.put("/:plantId", async (req, res, next) => {
  try {
    const found = await Plant.findByPk(req.params.plantId);
    const edited = await found.update(req.body);
    res.json(edited);
  } catch (err) {
    next(err);
  }
});

router.delete("/:plantId", async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    await plant.destroy();
    res.json(plant);
  } catch (err) {
    next(err);
  }
});
