import React from "react";
import { Link } from "react-router-dom";

const Visual = () => {
  return (
    <div>
      <h1>Visual</h1>
      <p>Trouble with note names, rhythms, slide positions/fingerings, etc.</p>
      <Link to="/tutor">
        <button>Back to Tutor</button>
      </Link>
      <h2>
        These will check to see if you are having and trouble understanding what
        the dots on the page are telling you to do.
      </h2>
      <h2>Pitches/Positions</h2>
      <ul>
        <li>
          1. Air play the passage. Blow air, articulate, move the slide, but
          DON'T buzz.
          <button>Got it!</button>
          <button>Still Hard</button>
        </li>
        <li>
          2. Say all of the positions/pitches evenly and slowly while you move
          the slide to the correct position. MAKE EACH ONE A QUARTER NOTE.
          <button>Got it!</button>
          <button>Still Hard</button>
        </li>
        <li>
          3. Say all of the positions evenly and slowly, use a metronome if
          necessary
          <button>Got it!</button>
          <button>Still Hard</button>
        </li>
        <li>
          4. Say all of the pitches evenly and slowly, use a metronome if
          necessary
          <button>Got it!</button>
          <button>Still Hard</button>
        </li>
      </ul>
      <h2>Rhythms</h2>
      <ul>
        <li>
          1. Articulate the rhythm of the passage by saying "Ta" or "Too" while
          clapping the pulse at the same time.
          <button>Got it!</button>
          <button>Still Hard</button>
        </li>
        <li>
          2. Tap the even pulse and say "Ta" or "Too" in quarter notes, eighth
          notes, triplets, sixteenth notes, etc. or whatever subdivision the
          passage requires.
          <button>Got it!</button>
          <button>Still hard</button>
        </li>
        <li>
          3. Tap an even pulse. If you can't do it at tempo, do it slower.
          <button>Got it!</button>
          <button>Still hard</button>
        </li>
      </ul>
    </div>
  );
};

export default Visual;
