//  This is the widget that allows for animation on scroll in the application.

import { Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

// Create a wrapper component that will be used to wrap any component that needs to be animated
const Animate = ({
  children,
  anim = "zoom-in-up",
  delay = "0",
  height = "auto",
}) => {
  useEffect(() => {
    AOS.init({ duration: 2500, once: true, delay: 0 });
  });
  return (
    <Box
      sx={{
        height: { height },
      }}
      data-aos={anim}
      data-aos-delay={delay}
    >
      {children}
    </Box>
  );
};

export default Animate;
