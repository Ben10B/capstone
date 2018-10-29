import React from 'react';
// import spinner from './spinner.gif';
import load1 from './Loading.gif';
// import load2 from './Loading(Fast).gif';

export default () => {
  return (
    <div style={{ height: '100vh', backgroundImage: `url(${load1})`,
      backgroundRepeat: 'no-repeat', backgroundSize: '50%', backgroundPosition: 'center center', }}>
      {/* <img
        // className="flex-10"
        src={load1}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      /> */}
    </div>
  );
};
