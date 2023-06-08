import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import addStudent from "./pages/addStudent";
import assignmentView from "./pages/assignmentView";
import createAssignment from "./pages/createAssignment";
import landingPage from "./pages/landingPage";
import loginPage from "./pages/loginPage";
import practiceHub from "./pages/practiceHub";
import signUpPage from "./pages/signUpPage";
import streakPractice from "./pages/streakPractice";
import studentDashboard from "./pages/studentDashboard";
import studentDetails from "./pages/studentDetails";
import teacherDashboard from "./pages/teacherDashboard";
import timedPractice from "./pages/timedPractice";
import weeklyPlan from "./pages/weeklyPlan";
import tutorHome from "./pages/virtualTutor/tutorHome";
import auralHome from ".pages/virtualTutor/auralHome";
import conceptualHome from ".pages/virtualTutor/conceptualHome";
import physicalHome from ".pages/virtualTutor/physicalHome";
import visualHome from ".pages/virtualTutor/visualHome";

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
        <Routes></Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
