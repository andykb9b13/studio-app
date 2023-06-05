const db = require("../config/connection");
const { Student, Teacher } = require("../models");
const studentData = require("./studentData.json");
const teacherData = require("./teacherData.json");

db.once("open", async () => {
  try {
    await Teacher.deleteMany({});
    const newTeacher = await Teacher.create(teacherData);

    await Student.deleteMany({});
    const studentArr = await Student.create(studentData);

    for (const student of studentArr) {
      await Teacher.findByIdAndUpdate(
        newTeacher[0]._id,
        { $addToSet: { students: student } },
        { new: true }
      );
    }

    console.log("Seeding Completed");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
