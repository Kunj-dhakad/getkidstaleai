
import React from 'react';
import { Animated, Fade, Move, Scale } from 'remotion-animated';
const RightMove: React.FC = () => {
  return <Animated
    animations={[
      Scale({ by: 1, initial: 10 }),
      Move({ y: -40, start: 50 }),
      Move({ y: 40, start: 100 }),
      Fade({ to: 0, start: 150 }),
      Scale({ by: 0, start: 150, mass: 75 }),
    ]}
  >
    
    hello word

  </Animated>;

}

export default RightMove;

