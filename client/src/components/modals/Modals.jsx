import React from 'react';
import yesF from '../../Assets/img/Passed-Female.png';
import yesM from '../../Assets/img/Passed-Male.png';
import noF from '../../Assets/img/Incompleted-Female.png';
import noM from '../../Assets/img/Incompleted-Male.png';
import powerUpM from '../../Assets/img/PowerUp-Male.gif';
// import aura from '../../Assets/img/Aura.gif';
import powerUpF from '../../Assets/img/PowerUp-Female.gif';

export const GoalResult = ({show, close, sprite, goal, history, updateSprite, updateGoal}) => {
  const showHideClassName = show ? 'detail-container modal display-block z-index' : 'detail-container modal display-none';
  let goalResult = (goal.result === "INCOMPLETE") ? 'GoalResult-Incomplete' : 'GoalResult-Complete';
  let showLvlUp = false;
  if(sprite.newLevel === "yes"){
    showLvlUp = true;
  }
  return (
    <div id={goalResult} className={showHideClassName}><LevelUp show={showLvlUp} sprite={sprite}/>
      <div className="details modal-main column">
        <h6 className="detailsHeading">{goal.result === "INCOMPLETE" ?
          'GOAL FAILED' : 'GOAL ACHIEVED!'}</h6>
        <div className="detailImg" style={{ 
          backgroundImage: `url(${goal.result === "INCOMPLETE" ? 
          (sprite.gender === "Female") ? noF : noM :
          (sprite.gender === "Female") ? yesF : yesM})` }}
        ></div>
        
        <button className="btn1" onClick={()=>{ 
          updateSprite(sprite, sprite._id);
          updateGoal(goal, goal._id);
          history.push('/');
          }}> Close </button>
      </div>
    </div>
  );
}

export const LevelUp = ({show, sprite}) => {
  const showHideClassName = show ? 'detail-container modal display-block z-index' : 'detail-container modal display-none';
  this.closeLvlUp = () => {
    document.getElementById('LevelUp').className = "detail-container modal display-none";
  }
  return (
    <div id="LevelUp" className={` ${showHideClassName}`}>
      <div className="details modal-main column">
        <h6 className="detailsHeading"><i className="fas fa-arrow-circle-up"></i> LEVEL UP!</h6>
        <div>Level {sprite.level}</div>
        <div className="detailImg" style={{ 
          backgroundImage: `url(${sprite.gender === "Female" ? powerUpF : powerUpM})` }}
        ></div>
        <button className="btn1" onClick={this.closeLvlUp}><i className="far fa-thumbs-up"></i> I'M THE BEST! </button>
      </div>
    </div>
  );
}