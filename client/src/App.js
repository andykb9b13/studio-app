import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/joy/CssBaseline";
import AppRoutes from "./Routes";
import { useState, useEffect, createContext } from "react";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { TeacherProvider } from "./utils/Context";
import { StudentProvider } from "./utils/Context";

const materialTheme = materialExtendTheme();

// Connecting application to GraphQL server
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Authentication middleware to send the token with every request
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

// instantiate the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // control how graphql requests are made and handled
  cache: new InMemoryCache(), // cache results of queries so we don't have to make unnecessary requests to the server
});

// clear the cache on page load
const clearApolloCache = () => {
  client.clearStore();
};

clearApolloCache();

export const MobileContext = createContext(); // context for mobile display

function App() {
  const [isMobile, setIsMobile] = useState(false);
  // checking if the window is mobile sized for conditional display rendering
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  return (
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <ApolloProvider client={client}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileContext.Provider value={{ isMobile }}>
              <TeacherProvider>
                <StudentProvider>
                  <AppRoutes />
                </StudentProvider>
              </TeacherProvider>
            </MobileContext.Provider>
          </LocalizationProvider>
        </ApolloProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
