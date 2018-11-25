import React from 'react';
import yesF from '../../Assets/img/Passed-Female.png';
import yesM from '../../Assets/img/Passed-Male.png';
import noF from '../../Assets/img/Incompleted-Female.png';
import noM from '../../Assets/img/Incompleted-Male.png';
import powerUpM from '../../Assets/img/PowerUp-Male.gif';
// import aura from '../../Assets/img/Aura.gif';
import powerUpF from '../../Assets/img/PowerUp-Female.gif';
import subImage from '../../Assets/img/Idle-Login.png';

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

export const ViewItem = ({show, toggleView, sprite, images, part, equip}) => {
  const showHideClassName = show ? 'detail-container modal display-block z-index' : 'detail-container modal display-none';
  let itemList = [];
  let items = [];
  let icon = "";

  switch(part) {
    case 'Hand': itemList = sprite.items.hand; icon = "fas fa-hand-paper"; break;
    case 'Head': itemList = sprite.items.head; icon = "fas fa-hat-wizard"; break;
    case 'Body': itemList = sprite.items.body; icon = "fas fa-tshirt"; break;
    case 'Accessory': itemList = sprite.items.accessory; icon = "fas fa-ring"; break;
    default: break;
  }

  // images.forEach(img => {
  //   itemList.forEach(item => {
  //     if(img.location.toString().includes(item.name)){
  //       if(item.equipped){
  //         items.unshift(<div key={item.name} className="detailImg mySlides" style={{ 
  //           backgroundImage: `url(${img.src})` }} title={item.description}
  //         ><p className="itemName">{item.name}</p></div>);
  //       } else {
  //         items.push(<div key={item.name} className="detailImg mySlides" style={{ 
  //           backgroundImage: `url(${img.src})` }} title={item.description}
  //         ><p className="itemName">{item.name}</p></div>);
  //       }
  //     }
  //   });
  // });

  images.forEach(img => {
    itemList.forEach(item => {
      if(img.location.toString().includes(item.name)){
        if(item.equipped){
          items.unshift({name: item.name, src: img.src, description: item.description, eq: item.equipped});
        } else {
          items.push({name: item.name, src: img.src, description: item.description, eq: item.equipped});
        }
      }
    });
  });

  //Slideshow
  let slide = 1;
  const slideShow = (index) => {
    document.getElementsByClassName("detailImg")[0].style.display = "none";
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    if (index > slides.length) slide = 1;
    if (index < 1) slide = slides.length;
    
    if(slides[slide - 1] !== undefined) slides[slide - 1].style.display = "block";

    document.getElementById("slideCount").innerText = 
      ((itemList.length === 0) ? 0 : slide) +"/"+items.length;
  }
  if (document.getElementsByClassName("slideShow-container").length !== 0 && show) {
    slideShow(slide);
  }
  const toggle = (x) => { 
    if(items.length !== 0) slideShow(slide += x);
  }
  
  return(
    <div className={` ${showHideClassName}`}>
      <div className="details modal-main column">
        <h6 className="detailsHeading"><i className={icon}></i> {part}</h6>
        <div className="slideShow-container wdth-100 hght-100">
          <div key={part} className="detailImg" style={{ 
            backgroundImage: `url(${subImage})` }}
          ></div>
            {items.map(item=>(
              <div key={item.name} className="mySlides">
                <p className="itemName">{item.name}</p>
                <div className="detailImg" style={{ 
                backgroundImage: `url(${item.src})` }} title={item.description}/>
                <p className="itemName">{item.eq ? 
                  (<button onClick={()=>{equip({part: part, name: item.name, eq: false}); toggleView('');}} className="btn1 equipped">Equipped</button>) : 
                  (<button onClick={()=>{equip({part: part, name: item.name, eq: true}); toggleView('');}} className="btn1 unequipped">Unequipped</button>)}
                </p>
              </div>
            ))}
            <label id="slideCount"></label>
            <p className="prev" onClick={()=>toggle(-1)}>&#10094;</p>
            <p className="next" onClick={()=>toggle(1)}>&#10095;</p>
        </div>
        <button className="btn1" onClick={()=>toggleView('')}> Close </button>
      </div>
    </div>
  );
}