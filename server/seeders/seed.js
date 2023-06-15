const db = require("../config/connection");
const {
  Student,
  Teacher,
  Assignment,
  SkillSheet,
  Goal,
  Streak,
  PracticePlan,
} = require("../models");
const studentData = require("./studentData.json");
const teacherData = require("./teacherData.json");
const assignmentData = require("./assignmentData.json");

db.once("open", async () => {
  try {
    await SkillSheet.deleteMany({});
    await Goal.deleteMany({});
    await Streak.deleteMany({});
    await PracticePlan.deleteMany({});
    await Teacher.deleteMany({});
    const newTeacher = await Teacher.create(teacherData);

    await Student.deleteMany({});
    const studentArr = await Student.create(studentData);

    await Assignment.deleteMany({});
    const assignmentArr = await Assignment.create(assignmentData);
    for (const assignment of assignmentArr) {
      let randomStudent = Math.floor(Math.random() * studentArr.length);
      await Student.findByIdAndUpdate(
        studentArr[randomStudent]._id,
        { $addToSet: { assignments: assignment } },
        { new: true }
      );
    }

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
