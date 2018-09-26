import React, { Component } from 'react';
// import idleM from './Assets/img/Idle-Male.gif';
// import powerUpM from './Assets/img/PowerUp-Male.gif';
import powerUpF from './Assets/img/PowerUp-Female.gif';
import idleF from './Assets/img/Idle-Female.gif';
import './App.css';
import './calendar.css';
import './BENstrap-in/css/my.css';

// class Calendar extends Component{
//     render() {
//         return (
//             <div className='calendar-container'>
//                 <div className='calendar'>
//                     <div id='month'>
//                         <ul>
//                             <li id='prev'>&#10094;</li>
//                             <li id='next'>&#10095;</li>
//                             <li>
//                                 <p id='the-month'>September</p>
//                                 <br/>
//                                 <span id='the-year'>2018</span>
//                             </li>
//                         </ul>
//                     </div>
//                     <div id='days'></div>
//                 </div>
//                 <div id='event-display'></div>
//             </div>
//         );
//     }
// }

class Dashboard extends Component {
    hover = () => { document.getElementById('dashImg').style.backgroundImage = `url(${powerUpF})`; };
    leave = () => { document.getElementById('dashImg').style.backgroundImage = `url(${idleF})`; };
    zoomIn = () => { document.getElementById('dashImg').style.backgroundSize = `contain`; };
    zoomOut = () => { document.getElementById('dashImg').style.backgroundSize = `auto`; };
    render() {
        return (
            <div id="dashboard" className="row">
                <div id="dashImg" className="flex-1" style={{ backgroundImage: `url(${idleF})` }}
                 onMouseEnter={this.hover} onMouseLeave={this.leave} onClick={this.zoomIn} onDoubleClick={this.zoomOut}></div>
                <span className="flex-8">
                    <h1>HollowSaiyan</h1>
                    <p>Level: 1</p>
                    <p>Experience: 0/10</p>
                </span>
                <button type="button" className="flex-1 btn1" onClick={this.props.click}>Create Goal</button>
            </div>
        );
    }
}
class NewGoal extends Component {
    render() {
        return (
            <div className="row">
                <span>
                    <h1>Goal Creation</h1>
                </span>
                <button type="button" className="btn1" onClick={this.props.click}>Back to Dashboard</button>
            </div>
        )
    }
}
class Goal extends Component {
    render() {
        return (
            <div className="column">
                <div className="row">
                    <span>
                        <h1>Goal {this.props.nameOfGoal}</h1>
                    </span>
                    <button type="button" className="btn1" onClick={()=>this.props.click('')}>Back to Dashboard</button>
                </div>
            </div>
        )
    }
}
// const GoalDetail = ({nameOfGoal, clickFunction}) => {
//     this.handleClick = () => {
//         clickFunction(nameOfGoal);
//     }
//     return (
//       <div className="goal fnt-white">
//         <div>
//             <p onClick={this.handleClick}>Goal {nameOfGoal} </p>
//             <p>Difficulty: <i>1</i></p>
//         </div>
//       </div>
//     );
// }
class GoalDetail extends Component {
    handleClick = () => {
        this.props.clickFunction(this.props.nameOfGoal);
    }
    render(){
        return (
            <div className="goal fnt-white">
              <div>
                  <p onClick={this.handleClick}>Goal {this.props.nameOfGoal} </p>
                  <p>Difficulty: <i>1</i></p>
              </div>
            </div>
        );
    }
}
const GoalList = (props) => {
    var goals = [];
    for(let i = 0; i < props.state.goals; i++){
        goals.push(<GoalDetail key={i} nameOfGoal={i} clickFunction={props.click}/>);
    }
    return(
        <div className="column" id="goalList">
            {goals}
        </div>
    );
}
class Home extends Component {
    state = {
        goals: 22,
        createGoal: false,
        showGOAL: false,
        nameOfGOAL: '',
        sprite: [],
    };
    createGoal = () => {
        this.setState({createGoal: !this.state.createGoal});
    };
    showGoal = (name) => {
        this.setState({nameOfGOAL: name});
        this.setState((prevState) => ({showGOAL: !prevState.showGOAL}));
    };
    render() {
        if(this.state.createGoal === true){
            return (
                <div className={`App-intro${this.props.appState.theme}`}>
                    <NewGoal click={this.createGoal}/>
                </div>
            );
        }
        else if(this.state.showGOAL === true){
            return (
                <div className={`App-intro${this.props.appState.theme}`}>
                    <Goal nameOfGoal={this.state.nameOfGOAL} click={this.showGoal}/>
                </div>
            );
        }
        return (
            <div className={`App-intro${this.props.appState.theme}`}>
                <Dashboard sprite={this.state.sprite} click={this.createGoal}/>
                <GoalList state={this.state} click={this.showGoal}/>
            </div>
        );
    }
}
  
export default Home;