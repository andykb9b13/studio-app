import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
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
import { useState, useEffect, createContext } from "react";

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

export const MobileContext = createContext();

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // checking if the window is mobile sized for conditional display rendering
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileContext.Provider value={{ isMobile }}>
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
                  path="/student/:id/practiceHub"
                  element={<PracticeHub />}
                />
                <Route
                  path="/teacher/createSkillSheet/:id"
                  element={<CreateSkillSheet />}
                />
                <Route path="/tutor" element={<VirtualTutor />} />
              </Routes>
            </Router>
          </MobileContext.Provider>
        </LocalizationProvider>
      </ApolloProvider>
    </CssVarsProvider>
  );
}

export default App;
