import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import StudentDetails from "./pages/StudentDetails";
import PracticePlanView from "./pages/PracticePlanView";
import PracticeHub from "./pages/PracticeHub";
import StreakPractice from "./pages/StreakPractice";
import TimedPractice from "./pages/TimedPractice";
import AssignmentView from "./pages/AssignmentView";
import VirtualHome from "./pages/virtualTutor/VirtualHome";
import Aural from "./pages/virtualTutor/Aural";
import Conceptual from "./pages/virtualTutor/Conceptual";
import Physical from "./pages/virtualTutor/Physical";
import Visual from "./pages/virtualTutor/Visual";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateSkillSheet from "./pages/CreateSkillSheet";
import SkillSheetView from "./pages/SkillSheetView";
import StudentDatabase from "./pages/StudentDatabase";
import { StudentProvider } from "./utils/StudentContext";

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
          <Route
            path="/teacher/studentDetails/:id"
            element={<StudentDetails />}
          />
          <Route path="/student/:id" element={<StudentDashboard />} />
          <Route
            path="/student/:id/practicePlanView"
            element={<PracticePlanView />}
          />
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
          <Route
            path="/teacher/studentDatabase/:id"
            element={
              <StudentProvider>
                <StudentDatabase />
              </StudentProvider>
            }
          />
          <Route
            path="/teacher/createSkillSheet/:id"
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
