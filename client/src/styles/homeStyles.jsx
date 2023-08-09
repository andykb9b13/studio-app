export const styles = {
  card: {
    width: "80%",
    mx: "auto",
    my: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: 1,
    boxShadow: "lg",
  },
  list: {
    listStyleType: "disc",
    fontSize: "1.3em",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    borderRadius: "50%",
    width: "200px",
    border: "4px solid black",
    transition: "all 0.2s",
    "&:hover": {
      border: "20px solid green",
    },
  },
  sheet: {
    backgroundColor: "rgb(102, 46, 155, 0.3)",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    p: 4,
  },
};
