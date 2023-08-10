import React from "react";
import { Sheet, Card, CardCover } from "@mui/joy";
import { styles } from "../styles/homeStyles";
import WelcomeCard from "../components/Home/WelcomeCard";
import AboutCard from "../components/Home/AboutCard";
import AboutDatabaseCard from "../components/Home/AboutDatabaseCard";
import AboutFeaturesCard from "../components/Home/AboutFeaturesCard";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import mountainBkgd from "../assets/mountainBkgd.png";
import mountainBkgd2 from "../assets/mountainBkgd2.png";

const Home = () => {
  return (
    <Sheet sx={styles.sheet}>
      <Navbar />
      <Card>
        <CardCover>
          <img src={mountainBkgd} loading="lazy" alt="mountains" />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />
        <WelcomeCard />
      </Card>
      <AboutCard />
      <Card>
        <CardCover>
          <img src={mountainBkgd2} loading="lazy" alt="mountains" />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />
        <AboutDatabaseCard />
      </Card>
      <AboutFeaturesCard />
      <Footer />
    </Sheet>
  );
};

export default Home;
