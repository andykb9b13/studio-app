import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentLogin from "./pages/StudentLogin";
import SignUp from "./pages/SignUp";
import StudentDetails from "./pages/StudentDetails";
import PracticeHub from "./pages/PracticeHub";
import VirtualTutor from "./pages/VirtualTutor";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./components/common/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const AppRoutes = () => {
  return (
    <main>
      <Router>
        <Navbar />
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

          {/* Practice Hub */}
          <Route path="/student/:id/practiceHub" element={<PracticeHub />} />

          {/* Virtual Tutor (troubleshooting page) */}
          <Route path="/tutor" element={<VirtualTutor />} />

          {/* Page not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
};

export default AppRoutes;
