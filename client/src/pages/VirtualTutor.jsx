import React from "react";
import Visual from "../components/VirtualTutor/Visual";
import Aural from "../components/VirtualTutor/Aural";
import Physical from "../components/VirtualTutor/Physical";
import Conceptual from "../components/VirtualTutor/Conceptual";
import { useState } from "react";

const VirtualTutor = () => {
  const [status, setStatus] = useState("home");
  const home = status === "home";
  const visual = status === "visual";
  const aural = status === "aural";
  const physical = status === "physical";
  const conceptual = status === "conceptual";

  const buttonInfo = [
    { buttonName: "Home" },
    { buttonName: "Visual" },
    { buttonName: "Aural" },
    { buttonName: "Physical" },
    { buttonName: "Conceptual" },
  ];

  const buttonPush = (name) => {
    setStatus(name.toLowerCase());
  };

  return (
    <div>
      <h1>Virtual Tutor</h1>
      <div>
        {buttonInfo.map((button, i) => (
          <button key={i} onClick={() => buttonPush(button.buttonName)}>
            {button.buttonName}
          </button>
        ))}
      </div>
      {home && (
        <div>
          <h2>You've got this!!! Let's figure out what's going on.</h2>
          <p>
            Sometimes it can be hard to figure out what you need to work on.
            These are some first steps to see if any of these need work. LOOK
            FOR HESITATION WHEN YOU DO THESE. If you hesitate with any of them,
            repeat it until you don't have hesitation.
          </p>
        </div>
      )}
      {visual && <Visual />}
      {aural && <Aural />}
      {physical && <Physical />}
      {conceptual && <Conceptual />}
    </div>
  );
};

export default VirtualTutor;
