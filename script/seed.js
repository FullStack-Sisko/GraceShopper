"use strict";

const {
  db,
  models: { User, Plant, Cart_Item },
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
    Plant.create({
      name: "Fiddle Leaf Fig",
      price: 35,
      description:
        "Tall, sculptural, and dramatic. This plant will flourish in the right conditions.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_fiddle-leaf-fig_charcoal-alt-e1625252593949.jpg?ver=279576",
      inventory: 5,
    }),
    Plant.create({
      name: "Schefflera Arboricola",
      price: 35,
      description:
        "With dramatic, umbrella-shaped leaf formations and braided trunk, the Schefflera Arboricola is a no-fuss tree that’s nearly 4 feet tall. Perfect for cozy reading nooks and small spaces where it can receive bright, indirect light.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_schefflera-arboricola_clay.jpg?ver=279602",
      inventory: 5,
    }),
    Plant.create({
      name: "Red Prayer Plant",
      price: 35,
      description:
        "Colorful and bold with hints of red on two-toned leaves",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2021/06/bloomscape_red-prayer-plant_charcoal_0621-scaled-e1625244693185.jpg?ver=542553",
      inventory: 5,
    }),
    Plant.create({
      name: "Peperomia Watermelon",
      price: 35,
      description:
        "Fitting its fun name, the Peperomia Watermelon’s round leaves look like striped green and white melon rinds supported by red stems. The Peperomia Watermelon is adaptable to a variety of light levels and is easy to care for. This peperomia is also fun to propagate through stem or leaf cuttings, making it the perfect educational activity for families..",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2022/03/bloomscape_african-violet_pink_small_detail1.jpg?ver=697052",
      inventory: 5,
    }),
    Plant.create({
      name: "Bamboo Palm",
      price: 35,
      description:
        "With dense foliage and lush fronds, the Bamboo Palm makes a statement. An air-purifying plant adaptable to low light, this palm can reach heights of up to 8 feet tall in the right conditions..",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_bamboo-palm_stone.jpg?ver=279484",
      inventory: 5,
    }),
    Plant.create({
      name: "Dracaena Gold Star",
      price: 235,
      description:
        "Whimsical and low-maintenance, with long, dark green and chartreuse striped leaves atop sturdy canes.",
      location: "Indoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_dracaena-gold-lemon-lime_slate.jpg?ver=279522",
      inventory: 5,
    }),
    Plant.create({
      name: "Monstera",
      price: 135,
      description:
        "Lively and wild with large, tropical leaves. Also known as the Swiss Cheese Plant.",
      location: "Indoor",
      care: "Easy",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_monstera_alt_charcoal-e1633461158128-768x922.jpg?ver=279412",
      inventory: 10,
    }),
    Plant.create({
      name: "Kangaroo Fern",
      price: 75,
      description:
        "This lively and pet-friendly fern has unique deep green fronds. The Kangaroo Fern grows long fuzzy roots known as rhizomes; when in its natural habitat, this plant uses these roots to spread across the forest floor. Mist your fern often to mimic its natural humid environment.",
      location: "Indoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2021/12/Bloomscape_KangarooFern_medium_Charcoal-1638x2048.jpg?ver=639598",
      inventory: 15,
    }),
    Plant.create({
      name: "Peace Lily",
      price: 95,
      description:
        "The Peace Lily has been an iconic houseplant for decades thanks to its forgiving nature, vibrant glossy leaves, and symbolic white blooms. This plant’s large leaves will give any space a lush jungle feeling. The Peace Lily has come to symbolize prosperity, purity, peace, and sympathy, making it a perfect heartfelt gift. More likely to bloom in bright indirect light, this plant tolerates any level of indirect light, including low light.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2022/05/bloomscape-peace-lily_large_slate-1707x2048.jpg?ver=790855",
      inventory: 15,
    }),
    Plant.create({
      name: "Neon Prayer Plant",
      price: 85,
      description:
        "Vibrant and bright with patterned, neon green leaves.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/09/bloomscape_neon-prayer-plant_indigo-e1629392599441.jpg?ver=292322",
      inventory: 25,
    }),
    Plant.create({
      name: "Blue Star Fern",
      price: 95,
      description:
        "The dramatic leaf shape of the Blue Star Fern lends a unique texture with a soft blue-green color. An easy-care houseplant, this fern can adapt to any level of indirect sunlight and does not require added humidity to thrive. Encourage new fronds to grow by keeping it trimmed and well-watered.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2022/05/bloomscape_blue-footed-fern_large_slate-scaled.jpg?ver=790765",
      inventory: 25,
    }),
    Plant.create({
      name: "Whale Fin Sansevieria",
      price: 75,
      description:
        "Making a huge statement with just one leaf, the Whale Fin Sansevieria is quite the standout among houseplants. These Sansevierias do well with infrequent waterings and can tolerate low to indirect bright light. Dust regularly to deter pests and keep the unique dappled pattern looking its best.",
      location: "Outdoor",
      care: "Easy",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2021/12/Bloomscape_SansevieriaMasoniana_medium_Charcoal-scaled.jpg?ver=640205",
      inventory: 5,
    }),
    Plant.create({
      name: "Hedgehog Aloe",
      price: 25,
      description:
        "Delightful succulent with spiked blue-green leaves",
      location: "Outdoor",
      care: "Easy",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2021/06/bloomscape_hedgehog-aloe_clay_0621-scaled-e1633461955886.jpg?ver=542486",
      inventory: 5,
    }),
    Plant.create({
      name: "Poneytail Palm Tree",
      price: 135,
      description:
        "A spirited desert-dweller popular for its low-maintenance care, the Ponytail Palm Tree is a larger, more full version of our beloved Ponytail Palm. With its bulb-like trunk and lively, thin leaves that spiral outwards, the Ponytail Palm Tree is a hardy succulent that adds exceptional character to any space.",
      location: "Outdoor",
      care: "Moderate",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2021/08/bloomscape_ponytail-palm_large_indigo_color-edit-e1633464147486-1282x1536.jpg?ver=582629",
      inventory: 25,
    }),
    Plant.create({
      name: "Prickly Pear Cactus",
      price: 65,
      description:
        "A playful cactus with pads shaped like a beavertail, the Prickly Pear Cactus is a low-maintenance plant with a no-fuss care routine with infrequent watering and fertilizing.",
      location: "Outdoor",
      care: "Easy",
      imgUrl:
        "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_prickly-pear-cactus_charcoal_alt.jpg?ver=279299",
      inventory: 5,
    }),
  ]);
  // const cart_items = await Promise.all([
  //   Cart_Item.create({ id: 1, quantity: 2, plantId: 1, userId: 1 }),
  //   Cart_Item.create({ id: 2, quantity: 1, plantId: 1, userId: 2 }),
  //   Cart_Item.create({ id: 3, quantity: 1, plantId: 3, userId: 2 }),

  // ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${plants.length} plants`);
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
    // cart_items: {
    //   firstItem: cart_items[0],
    //   secondItem: cart_items[1],
    //   thirdItem: cart_items[2]
    // }
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
