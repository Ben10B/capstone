import React from 'react';
import spinner from './spinner.gif';
import load1 from './Loading.gif';
import load2 from './Loading(Fast).gif';
import theme2 from '../../Assets/img/Theme-Two.png';

export default () => {
  return (
    <div>
      <img
        // className="flex-10"
        src={load1}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
