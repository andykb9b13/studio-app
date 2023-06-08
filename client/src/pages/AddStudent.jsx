import React from "react";
import { Link } from "react-router-dom";

const AddStudent = () => {
  return (
    <div>
      <h1>Add Student</h1>
      <form action="submit">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
        <label htmlFor="school">School</label>
        <input type="text" name="school" id="school" />
        <label htmlFor="grade">Grade</label>
        <input type="number" name="grade" id="grade" />
        <label htmlFor="instrument">Instrument</label>
        <input type="text" name="instrument" id="instrument" />
        <label htmlFor="primaryContact">Primary Contact</label>
        <input type="text" name="primaryContact" id="primaryContact" />
        <label htmlFor="primaryContactEmail">Primary Contact Email</label>
        <input
          type="text"
          name="primaryContactEmail"
          id="primaryContactEmail"
        />
        <label htmlFor="lessonDay">Lesson Day</label>
        <input type="text" name="lessonDay" id="lessonDay" />
        <label htmlFor="lessonTime">Lesson Time</label>
        <input type="text" name="lessonTime" id="lessonTime" />
        <label htmlFor="lessonLocation">Lesson Location</label>
        <input type="text" name="lessonLocation" id="lessonLocation" />
        <button>Add Student</button>
      </form>
      <Link to="/teacher/:id">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default AddStudent;
