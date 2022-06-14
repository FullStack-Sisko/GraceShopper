//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Order = require("./models/Order");

const Plant = require("./models/Plant");

//associations could go here!

Order.hasMany(Plant);
Plant.belongsToMany(Order, { through: "Order_Details" });

User.hasMany(Order);
Order.belongsTo(User, { through: "User_Orders" });

module.exports = {
  db,
  models: {
    User,
    Order,
    Plant,
  },
};
