import { useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
// import { QUERY_PRACTICEPLANS } from "../utils/queries";
import { useLocation } from "react-router-dom";

const PracticePlanView = () => {
  // const { id } = useParams();
  // const practicePlans = useQuery(QUERY_PRACTICEPLANS);

  const location = useLocation();
  console.log(location);

  return (
    <div>
      <h1>Weekly Plan</h1>
      <div>
        {/* add so that the week display is dynamic */}
        <h2>Week Of ... </h2>
        <button>View Previous Week</button>
        <button>View Next Week</button>
        {/* Insert assignmentcomponent here */}
        <Link to="/student/:id">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default PracticePlanView;
