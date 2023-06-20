import React from "react";
import { Link } from "react-router-dom";
import Visual from "./Visual";
import Aural from "./Aural";
import Physical from "./Physical";
import Conceptual from "./Conceptual";
import { useState } from "react";

const VirtualTutor = () => {
  const [status, setStatus] = useState("home");
  const home = status === "home";
  const visual = status === "visual";
  const aural = status === "aural";
  const physical = status === "physical";
  const conceptual = status === "conceptual";

  console.log(home, visual, aural, physical, conceptual);

  const buttonInfo = [
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
      <div>
        {buttonInfo.map((button, i) => (
          <button key={i} onClick={() => buttonPush(button.buttonName)}>
            {button.buttonName}
          </button>
        ))}
      </div>
      {home && (
        <div>
          <h1>Virtual Tutor</h1>
          <h2>You've got this!!! Let's figure out what's going on.</h2>
          <p>
            Sometimes it can be hard to figure out what you need to work on.
            These are some first steps to see if any of these need work. LOOK
            FOR HESITATION WHEN YOU DO THESE. If you hesitate with any of them,
            repeat it until you don't have hesitation.
          </p>
        </div>
      )}

      {visual && (
        <div className="tutorSelections">
          <Visual />
          <p>
            Trouble with note names, rhythms, slide positions/fingerings, etc.
          </p>
        </div>
      )}

      {aural && (
        <div className="tutorSelections">
          <Aural />
          <p>Can't hear what the melody is supposed to sound like.</p>
        </div>
      )}

      {physical && (
        <div className="tutorSelections">
          <Physical />
          <p>
            Can do all of the visual and aural aspects but having trouble making
            the right sound or executing the mechanics of playing.
          </p>
        </div>
      )}

      {conceptual && (
        <div className="tutorSelections">
          <Conceptual />
          <p>Feeling lost about the style/interpretation/creative aspects.</p>
        </div>
      )}
    </div>
  );
};

export default VirtualTutor;
