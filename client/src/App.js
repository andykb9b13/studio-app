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
import PracticeHub from "./pages/PracticeHub";
import VirtualTutor from "./pages/virtualTutor/VirtualTutor";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateSkillSheet from "./components/CreateSkillSheet";

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
          <Route path="/student/:id/practiceHub" element={<PracticeHub />} />
          <Route
            path="/teacher/createSkillSheet/:id"
            element={<CreateSkillSheet />}
          />
          <Route path="/tutor" element={<VirtualTutor />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
