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
import "./App.css";
import { useState, useEffect, createContext } from "react";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";

const materialTheme = materialExtendTheme();

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

const clearApolloCache = () => {
  client.clearStore();
};

clearApolloCache();

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
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <ApolloProvider client={client}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileContext.Provider value={{ isMobile }}>
              <AppRoutes />
            </MobileContext.Provider>
          </LocalizationProvider>
        </ApolloProvider>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}

export default App;
