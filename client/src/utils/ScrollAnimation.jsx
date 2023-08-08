import { Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Animate = ({
  children,
  anim = "zoom-in-up",
  delay = "0",
  height = "auto",
}) => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
  });
  return (
    <Box sx={{ height: { height } }} data-aos={anim} data-aos-delay={delay}>
      {children}
    </Box>
  );
};

export default Animate;
