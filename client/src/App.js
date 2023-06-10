import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AddStudent from "./pages/AddStudent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import StudentDetails from "./pages/StudentDetails";
import WeeklyPlan from "./pages/WeeklyPlan";
import PracticeHub from "./pages/PracticeHub";
import StreakPractice from "./pages/StreakPractice";
import TimedPractice from "./pages/TimedPractice";
import AssignmentView from "./pages/AssignmentView";
import CreateAssignment from "./pages/CreateAssignment";
import VirtualHome from "./pages/virtualTutor/VirtualHome";
import Aural from "./pages/virtualTutor/Aural";
import Conceptual from "./pages/virtualTutor/Conceptual";
import Physical from "./pages/virtualTutor/Physical";
import Visual from "./pages/virtualTutor/Visual";
import StudentDatabase from "./pages/StudentDatabse";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateSkillSheet from "./pages/CreateSkillSheet";
import SkillSheetView from "./pages/SkillSheetView";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/teacher/:id" element={<TeacherDashboard />} />
          <Route path="/student/:id" element={<StudentDashboard />} />
          <Route path="/student/:id/details" element={<StudentDetails />} />
          <Route path="/student/:id/weeklyPlan" element={<WeeklyPlan />} />
          <Route path="/student/:id/practiceHub" element={<PracticeHub />} />
          <Route
            path="/student/:id/skillSheetView"
            element={<SkillSheetView />}
          />
          <Route
            path="/student/:id/streakPractice"
            element={<StreakPractice />}
          />
          <Route
            path="/student/:id/timedPractice"
            element={<TimedPractice />}
          />
          <Route
            path="/student/:id/assignmentView"
            element={<AssignmentView />}
          />
          <Route path="/teacher/:id/addStudent" element={<AddStudent />} />
          <Route
            to="teacher/:id/studentDatabase"
            element={<StudentDatabase />}
          />
          <Route
            path="/teacher/:id/createAssignment"
            element={<CreateAssignment />}
          />
          <Route
            path="/teacher/:id/createSkillSheet"
            element={<CreateSkillSheet />}
          />
          <Route path="/tutor" element={<VirtualHome />} />
          <Route path="/tutor/aural" element={<Aural />} />
          <Route path="/tutor/conceptual" element={<Conceptual />} />
          <Route path="/tutor/physical" element={<Physical />} />
          <Route path="/tutor/visual" element={<Visual />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
