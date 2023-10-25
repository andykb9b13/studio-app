export const styles = {
  card: {
    width: "80%",
    mx: "auto",
    my: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: 1,
    boxShadow: "lg",
    whiteSpace: "pre-line",
  },
  mobileCard: {
    width: "100%",
    mx: "auto",
    my: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: 1,
    boxShadow: "lg",
    whiteSpace: "pre-line",
  },
  list: {
    fontSize: "1.3em",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    borderRadius: "50%",
    width: "300px",
    border: "4px solid black",
    transition: "all 0.2s",
    "&:hover": {
      border: "20px solid green",
    },
  },
  sheet: {
    backgroundColor: "rgb(67, 188, 205, 0.3)",
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
  image: {
    margin: "1%",
    boxShadow: "1px 1px 5px grey",
    borderRadius: "10px",
  },
  listHover: {
    "&:hover": {
      color: "#662e9b",
      transition: "all 0.2s",
      fontWeight: "bold",
    },
  },
};
