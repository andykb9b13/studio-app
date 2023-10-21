import React from "react";
import { Sheet, Card, CardCover } from "@mui/joy";
import { styles } from "../styles/homeStyles";
import WelcomeCard from "../components/Home/WelcomeCard";
import AboutCard from "../components/Home/AboutCard";
import AboutDatabaseCard from "../components/Home/AboutDatabaseCard";
import AboutFeaturesCard from "../components/Home/AboutFeaturesCard";
import Footer from "../components/Footer/Footer";
import mountainBkgd from "../assets/mountainBkgd.png";
import mountainBkgd2 from "../assets/mountainBkgd2.png";

const Home = () => {
  return (
    <Sheet id="mainHomePage" sx={styles.sheet}>
      <Card id="welcomeCardWrapper">
        <CardCover>
          <img src={mountainBkgd} loading="lazy" alt="mountains" />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />

        {/* Initial card with quick actions and snapshot of features */}
        <WelcomeCard />
      </Card>

      {/* Provides details and previews about features in the application */}
      <AboutCard />

      <Card id="aboutDatabaseCardWrapper">
        <CardCover>
          <img src={mountainBkgd2} loading="lazy" alt="mountains" />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />
        {/* Provides details about and previews about features related to the student database */}
        <AboutDatabaseCard />
      </Card>

      {/* Snapshot of some of the features included in the application */}
      <AboutFeaturesCard />
      <Footer />
    </Sheet>
  );
};

export default Home;
