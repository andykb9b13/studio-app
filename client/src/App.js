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
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentDetails from "./pages/StudentDetails";
import WeeklyPlan from "./pages/WeeklyPlan";
import PracticeHub from "./pages/PracticeHub";
import StreakPractice from "./pages/StreakPractice";
import TimedPractice from "./pages/TimedPractice";
import AssignmentView from "./pages/AssignmentView";
import CreateAssignment from "./pages/CreateAssignment";
import TutorHome from "./pages/virtualTutor/TutorHome";
import Aural from "./pages/virtualTutor/Aural";
import Conceptual from "./pages/virtualTutor/Conceptual";
import Physical from "./pages/virtualTutor/Physical";
import Visual from "./pages/virtualTutor/Visual";

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
          <Route path="/student/:id/weeklyplan" element={<WeeklyPlan />} />
          <Route path="/student/:id/practicehub" element={<PracticeHub />} />
          <Route
            path="/student/:id/streakpractice"
            element={<StreakPractice />}
          />
          <Route
            path="/student/:id/timedpractice"
            element={<TimedPractice />}
          />
          <Route
            path="/student/:id/assignmentview"
            element={<AssignmentView />}
          />
          <Route path="/teacher/:id/addstudent" element={<AddStudent />} />
          <Route
            path="/teacher/:id/createassignment"
            element={<CreateAssignment />}
          />
          <Route path="/tutor/" element={<TutorHome />} />
          <Route path="/tutor/aural/" element={<Aural />} />
          <Route path="/tutor/conceptual/" element={<Conceptual />} />
          <Route path="/tutor/physical/" element={<Physical />} />
          <Route path="/tutor/visual/" element={<Visual />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
