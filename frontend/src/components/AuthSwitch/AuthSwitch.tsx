import React from 'react';

import './AuthSwitch.css';

const BigSwitch = () => {
  return (
    <div className="switch">
      <input type="checkbox" className="switch__checkbox" id="switch" tabIndex={-1} />
      <label htmlFor="switch" className='switch__label'></label>
    </div>
  )
}

export default BigSwitch;