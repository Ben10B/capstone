import React from 'react';
import yesF from '../../Assets/img/Completed-Female.png';
import yesM from '../../Assets/img/Completed-Male.png';
import noF from '../../Assets/img/Incompleted-Female.png';
import noM from '../../Assets/img/Incompleted-Male.png';

export const GoalResult = ({show, close, sprite, goal}) => {
  const showHideClassName = show ? 'detail-container modal display-block z-index' : 'detail-container modal display-none';
  return (
    <div className={showHideClassName}>
      <div className="details modal-main column">
        <h6 className="detailsHeading">{goal.result === "INCOMPLETE" ?
          'GOAL FAILED' : 'GOAL ACHIEVED!'}</h6>
        <div className="detailImg" style={{ 
          backgroundImage: `url(${goal.result === "INCOMPLETE" ? 
          (sprite.gender === "Female") ? noF : noM :
          (sprite.gender === "Female") ? yesF : yesM})` }}
        ></div>
        
        <button className="btn1" onClick={close}> Close </button>
      </div>
    </div>
  );
}

export const LevelUp = ({ }) => {
  return (
    <div className={``}>
      <h1>Level Up</h1>
    </div>
  );
}