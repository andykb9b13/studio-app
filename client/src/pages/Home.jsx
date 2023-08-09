import React from "react";
import { Sheet } from "@mui/joy";
import { styles } from "../styles/homeStyles";
import WelcomeCard from "../components/Home/WelcomeCard";
import AboutCard from "../components/Home/AboutCard";
import AboutDatabaseCard from "../components/Home/AboutDatabaseCard";
import AboutFeaturesCard from "../components/Home/AboutFeaturesCard";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <Sheet sx={styles.sheet}>
      <Navbar />
      <WelcomeCard />
      <AboutCard />
      <AboutDatabaseCard />
      <AboutFeaturesCard />
      <Footer />
    </Sheet>
  );
};

export default Home;
