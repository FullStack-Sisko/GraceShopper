const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));

router.use("/plants", require("./plants"));

router.use("/orders", require("./orders"));


router.use('/cart_items', require('./cart_items'))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
