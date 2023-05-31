const db = require("../config/connection");
const { Student } = require("../models");
const seedData = require("./seedData.json");

db.once("open", async () => {
  try {
    await Student.deleteMany({});
    await Student.create(seedData);
    console.log("Seeding Completed");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
