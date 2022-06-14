"use strict";

const {
  db,
  models: { User, Plant },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123", isAdmin: true }),
    User.create({ username: "murphy", password: "123", isAdmin: false }),
  ]);

  const plants = await Promise.all([
    Plant.create({
      name: "Money Tree",
      price: 169,
      description:
        "Popular for its use in Feng Shui, the Money Tree is a pet-friendly and air-purifying plant with large star-shaped leaves and a braided trunk to give your home a tropical feel.",
      location: "Indoor",
      care: "No-Fuss",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_money-tree_stone.jpg?ver=279410",
      inventory: 50,
    }),
    Plant.create({
      name: "Bromeliad Pineapple",
      price: 79,
      description:
        "Add a tropical splash to any space with this truly unique flowering Bromeliad that grows edible pineapple fruit.",
      location: "Indoor",
      care: "No-Fuss",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bromeliad-pineapple_indigo-e1628794021645.jpg?ver=279193",
      inventory: 0,
    }),
    Plant.create({
      name: "Bird of Paradise",
      price: 199,
      description:
        "Impressive and tropical with large, glossy leaves that naturally split over time.",
      location: "Outdoor",
      care: "Easy",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bird-of-paradise_indigo.jpg?ver=279491",
      inventory: 10,
    }),
    Plant.create({
      name: "African Violet",
      price: 35,
      description:
        "Beyond its vibrant blossoms, the African Violet also has soft fuzzy leaves that give it a one-of-a-kind aesthetic. This plant makes a great gift. Given the right watering and lighting, it will bloom for years to come.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2022/03/bloomscape_african-violet_pink_small_detail1.jpg?ver=697052",
      inventory: 5,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    plants: {
      moneyTree: plants[0],
      bromeliad: plants[1],
      birdOfParadise: plants[2],
      africanViolet: plants[3],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
