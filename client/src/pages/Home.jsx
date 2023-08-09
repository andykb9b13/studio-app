import React from "react";
import { Sheet } from "@mui/joy";
import { styles } from "../styles/homeStyles";
import WelcomeCard from "../components/Home/WelcomeCard";
import AboutCard from "../components/Home/AboutCard";
import AboutDatabaseCard from "../components/Home/AboutDatabaseCard";
import AboutSkillSheetCard from "../components/Home/AboutSkillSheetCard";
import AboutPracticeHubCard from "../components/Home/AboutPracticeHubCard";
import AboutVirtualTutorCard from "../components/Home/AboutVirtualTutorCard";

const Home = () => {
  return (
    <Sheet sx={styles.sheet}>
      <WelcomeCard />
      <AboutCard />
      <AboutDatabaseCard />
      <AboutSkillSheetCard />
      <AboutPracticeHubCard />
      <AboutVirtualTutorCard />
    </Sheet>
  );
};

export default Home;
