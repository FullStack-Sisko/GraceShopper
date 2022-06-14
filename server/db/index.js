//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");

const Order = require("./models/Order");

const Plant = require("./models/Plant");

const Cart_Item = require("./models/Cart_Item");

//associations could go here!

Order.belongsToMany(Plant, { through: "Order_Details" });
Plant.belongsToMany(Order, { through: "Order_Details" });

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Cart_Item);
Cart_Item.belongsTo(Order);

Cart_Item.belongsToMany(Plant, { through: "Carted_Plants" });
Plant.belongsToMany(Cart_Item, { through: "Carted_Plants" });

Cart_Item.belongsTo(User);
User.hasMany(Cart_Item);

module.exports = {
  db,
  models: {
    User,
    Order,
    Plant,
    Cart_Item,
  },
};
