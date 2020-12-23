import React from 'react';
import Confetti from 'react-dom-confetti';

import { COLORS } from '@constants/index';

const config = {
  angle: 90,
  spread: 45,
  startVelocity: 65,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 5000,
  delay: 0,
  width: '10px',
  height: '10px',
  colors: [COLORS.blue, COLORS.lightBlue, COLORS.pink, COLORS.green, COLORS.lightBlue2],
};

export default ({ isActive = false }: any) => <Confetti active={isActive} config={config} />;
