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
const practicePlanData = require("./practicePlanData.json");

db.once("open", async () => {
  try {
    await SkillSheet.deleteMany({});
    await Goal.deleteMany({});
    await Streak.deleteMany({});

    await Teacher.deleteMany({});
    const newTeacher = await Teacher.create(teacherData);

    await Student.deleteMany({});
    const studentArr = await Student.create(studentData);

    await PracticePlan.deleteMany({});
    const practicePlanArr = await PracticePlan.create(practicePlanData);

    await Assignment.deleteMany({});
    const assignmentArr = await Assignment.create(assignmentData);
    for (const assignment of assignmentArr) {
      let randomPracticePlan = Math.floor(
        Math.random() * practicePlanArr.length
      );
      const practicePlan = await PracticePlan.findByIdAndUpdate(
        practicePlanArr[randomPracticePlan]._id,
        { $addToSet: { assignments: assignment } },
        { new: true }
      );
      console.log("asignment", assignment);
      console.log("practicePlan", practicePlan);
    }

    for (const practicePlan of practicePlanArr) {
      let randomStudent = Math.floor(Math.random() * studentArr.length);
      await Student.findByIdAndUpdate(
        studentArr[randomStudent]._id,
        { $addToSet: { practicePlans: practicePlan } },
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
