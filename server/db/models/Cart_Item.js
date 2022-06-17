const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("cart_item", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});
