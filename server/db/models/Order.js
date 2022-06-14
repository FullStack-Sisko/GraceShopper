onst Sequelize = require("sequelize");
const db = require("./db");

module.exports = db.define("order", {
  plantId: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  plantPrice: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  orderId: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATE,
  },
  total: {
    type: Sequelize.NUMBER,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
  },
});