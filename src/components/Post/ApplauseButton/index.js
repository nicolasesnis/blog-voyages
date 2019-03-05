import React from 'react';
import script from 'applause-button';
import applauseStyles from './applause-button.css';


const ApplauseButton = () => (
  <applause-button
          color="black"
          className={applauseStyles}
          style={{ width: '50px', height: '50px', margin: 'auto' }}
        />
);

export default ApplauseButton;
