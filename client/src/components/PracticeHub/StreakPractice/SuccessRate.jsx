import { successResponseList } from "../../common/Assets";
import { blunderResponseList } from "../../common/Assets";
import { Card, Typography, CardActions, Button } from "@mui/joy";

export function SuccessRate({ percentage, resetStreak }) {
  let message = "";
  let responseImage = "";
  if (percentage <= 25) {
    message = "Hmm... ";
    responseImage = blunderResponseList[2].name;
  } else if (percentage <= 50) {
    message = "Still needs some work...";
    responseImage = blunderResponseList[15].name;
  } else if (percentage <= 75) {
    message = "You're getting closer, keep it up...";
    responseImage = successResponseList[2].name;
  } else if (percentage < 100) {
    message = "You're sooooo close!";
    responseImage = successResponseList[12].name;
  } else if (percentage === 100) {
    message = "Perfection!";
    responseImage = successResponseList[9].name;
  }

  return (
    <Card variant="outlined">
      <img src={responseImage} alt="emoji" style={{ maxWidth: "50%" }} />
      <Typography level="h2">Success Rate</Typography>
      <Typography level="h4">{percentage} % success rate</Typography>
      <Typography level="h4">{message}</Typography>
      <CardActions>
        <Button color="success" onClick={resetStreak}>
          Try Again
        </Button>
      </CardActions>
    </Card>
  );
}
