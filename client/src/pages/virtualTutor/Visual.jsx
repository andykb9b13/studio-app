import React, { useState } from "react";
import { Link } from "react-router-dom";

function Prompt({ title, text, setActive, active }) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{text}</h2>
      <button onClick={() => setActive(active - 1)}>Got it!</button>
      <button onClick={() => setActive(active + 1)}>Still Hard</button>
    </div>
  );
}

const Visual = () => {
  const [active, setActive] = useState(0);

  return (
    <div>
      {active === 0 && (
        <div>
          <h1>Visual</h1>
          <p>
            Trouble with note names, rhythms, slide positions/fingerings, etc.
          </p>
          <h2>
            These will check to see if you are having and trouble understanding
            what the dots on the page are telling you to do.
          </h2>
          <button onClick={() => setActive(1)}>Go On</button>
        </div>
      )}
      {active === 1 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Pitches and Positions"}
          text={
            "1. Air play the passage. Blow air, articulate, move the slide, but DON'T buzz."
          }
        />
      )}
      {active === 2 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Pitches and Positions"}
          text={
            "2. Say all of the positions/pitches evenly and slowly while you move the slide to the correct position. MAKE EACH ONE A QUARTER NOTE."
          }
        />
      )}
      {active === 3 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Pitches and Positions"}
          text={
            "3. Say all of the positions evenly and slowly, use a metronome if necessary"
          }
        />
      )}
      {active === 4 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Pitches and Positions"}
          text={
            "4. Say all of the pitches evenly and slowly, use a metronome if necessary."
          }
        />
      )}
      {active === 5 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Pitches and Positions"}
          text={
            "4. Say all of the pitches evenly and slowly, use a metronome if necessary."
          }
        />
      )}
      {active === 6 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Rhythms"}
          text={
            " 1. Articulate the rhythm of the passage by saying 'Ta' or 'Too' whileclapping the pulse at the same time."
          }
        />
      )}
      {active === 7 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Rhythms"}
          text={
            " 2. Tap the even pulse and say 'Ta' or 'Too' in quarter notes, eighth notes, triplets, sixteenth notes, etc. or whatever subdivision the passage requires."
          }
        />
      )}
      {active === 8 && (
        <Prompt
          active={active}
          setActive={setActive}
          title={"Rhythms"}
          text={
            " 3. Tap an even pulse. If you can't do it at tempo, do it slower."
          }
        />
      )}
    </div>
  );
};

export default Visual;
