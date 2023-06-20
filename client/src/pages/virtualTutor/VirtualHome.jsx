import React from "react";
import { Link } from "react-router-dom";

const VirtualTutor = () => {
  return (
    <div>
      <h1>Virtual Tutor</h1>
      <h2>You've got this!!! Let's figure out what's going on.</h2>
      <p>
        Sometimes it can be hard to figure out what you need to work on. These
        are some first steps to see if any of these need work. LOOK FOR
        HESITATION WHEN YOU DO THESE. If you hesitate with any of them, repeat
        it until you don't have hesitation.
      </p>
      <div>
        <Link to="/tutor/visual">
          <button>Visual</button>
        </Link>
        <p>
          Trouble with note names, rhythms, slide positions/fingerings, etc.
        </p>
        <Link to="/tutor/aural">
          <button>Aural</button>
        </Link>
        <p>Can't hear what the melody is supposed to sound like.</p>
        <Link to="/tutor/physical">
          <button>Physical</button>
        </Link>
        <p>
          Can do all of the visual and aural aspects but having trouble making
          the right sound or executing the mechanics of playing.
        </p>
        <Link to="/tutor/conceptual">
          <button>Conceptual</button>
        </Link>
        <p>Feeling lost about the style/interpretation/creative aspects.</p>
      </div>
    </div>
  );
};

export default VirtualTutor;
