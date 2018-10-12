import React from 'react';
import spinner from './spinner.gif';
import theme2 from '../../Assets/img/Theme-Two.png';

export default () => {
  return (
    <div>
      <img
        // className="flex-10"
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block', background: `url(${theme2}) center/cover no-repeat` }}
        alt="Loading..."
      />
    </div>
  );
};
