import React from 'react';
import yesF from '../../Assets/img/Passed-Female.png';
import yesM from '../../Assets/img/Passed-Male.png';
import noF from '../../Assets/img/Incompleted-Female.png';
import noM from '../../Assets/img/Incompleted-Male.png';
import powerUpM from '../../Assets/img/PowerUp-Male.gif';
// import aura from '../../Assets/img/Aura.gif';
import powerUpF from '../../Assets/img/PowerUp-Female.gif';

export const GoalResult = ({show, sprite, goal, history, updateSprite, updateGoal}) => {
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
  const closeLvlUp = () =>{
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
        <button className="btn1" onClick={closeLvlUp}><i className="far fa-thumbs-up"></i> I'M THE BEST! </button>
      </div>
    </div>
  );
}

export const ViewItem = ({show, toggleView, sprite, images, part}) => {
  const showHideClassName = show ? 'detail-container modal display-block z-index' : 'detail-container modal display-none';
  let itemList = [];
  let icon = "";
  switch(part) {
    case 'hand': itemList = sprite.items.hand; icon = "fas fa-hand-paper"; break;
    case 'head': itemList = sprite.items.head; break;
    case 'body': itemList = sprite.items.body; break;
    case 'acc1': itemList = sprite.items.accessory; icon = "fas fa-ring"; break;
    default: itemList = []; icon = ""; break;
  }
  let items = sprite.items.hand.map(item => (
    <div key={item.name} className="detailImg mySlides" style={{ 
      backgroundImage: `url(${powerUpM})` }}
    ></div>
  ));

  //Slideshow
  let slide = 1;
  const slideShow = (index) => {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    if (index > slides.length) slide = 1;
    if (index < 1) slide = slides.length;
    
    if(slides[slide - 1] !== undefined)
      slides[slide - 1].style.display = "block";
    document.getElementById("slideCount").innerText = 
      ((itemList.length === 0) ? 0 : slide) +"/"+itemList.length;
  }
  if (document.getElementsByClassName("slideShow-container").length !== 0) {
    slideShow(slide);
  }
  const toggle = (x) => {
    slideShow(slide += x);
  }
  
  return(
    <div className={` ${showHideClassName}`}>
      <div className="details modal-main column">
        <h6 className="detailsHeading"><i className={icon}></i> {part}</h6>
        <div className="slideShow-container wdth-100 hght-100">
            {items}
            <label id="slideCount"></label>
            <p className="prev" onClick={()=>toggle(-1)}>&#10094;</p>
            <p className="next" onClick={()=>toggle(1)}>&#10095;</p>
        </div>
        <button className="btn1" onClick={()=>toggleView('')}> Close </button>
      </div>
    </div>
  );
}
//<i class="fas fa-ring"></i>
//<i class="fas fa-hand-paper"></i>