import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import StudentDetails from "./pages/StudentDetails";
import PracticeHub from "./pages/PracticeHub";
import VirtualTutor from "./pages/VirtualTutor";
import TeacherDashboard from "./pages/TeacherDashboard";
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

          {/* Student Login Page */}
          <Route path="/studentLogin" element={<StudentLogin />} />

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

          {/* Page not found */}
          <Route path="*" element={<div>404 Page not found</div>} />
        </Routes>
      </Router>
    </main>
  );
};

export default AppRoutes;
