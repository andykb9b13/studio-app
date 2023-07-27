import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import StudentDetails from "./pages/StudentDetails";
import PracticeHub from "./pages/PracticeHub";
import VirtualTutor from "./pages/virtualTutor/VirtualTutor";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateSkillSheet from "./components/CreateSkillSheet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <main>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Signup Page */}
          <Route path="/signup" element={<SignUp />} />

          {/* Teacher Dashboard */}
          <Route path="/teacher/:id" element={<TeacherDashboard />} />

          {/* Student Details (top component for each student) */}
          <Route
            path="/teacher/studentDetails/:id"
            element={<StudentDetails />}
          />

          {/* Student Dashboard (not in use yet) */}
          <Route path="/student/:id" element={<StudentDashboard />} />

          {/* Practice Hub */}
          <Route path="/student/:id/practiceHub" element={<PracticeHub />} />

          {/* Virtual Tutor (troubleshooting page) */}
          <Route path="/tutor" element={<VirtualTutor />} />
        </Routes>
      </Router>
    </main>
  );
};

export default AppRoutes;
