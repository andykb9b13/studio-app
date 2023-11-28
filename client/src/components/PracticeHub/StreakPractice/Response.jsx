import { Typography, Box } from "@mui/joy";

export const Response = ({ responseMessage, responseImage }) => {
  return (
    <>
      <Typography level="h2" sx={{ color: "white" }} textAlign="center">
        "{responseMessage}"
      </Typography>
      <Box display="flex" justifyContent="center">
        <img
          src={responseImage}
          alt="emoji avatar"
          style={{ width: "300px" }}
        />
      </Box>
    </>
  );
};
