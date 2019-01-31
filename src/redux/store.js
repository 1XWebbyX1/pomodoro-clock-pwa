import {createStore} from 'redux'


const UPDATE_SESSION_LENGTH = 'UPDATE_SESSION_LENGTH';
const UPDATE_BREAK_LENGTH = 'UPDATE_BREAK_LENGTH';
const UPDATE_PLAY_STATE = 'UPDATE_PLAY_STATE';
const UPDATE_INTERVAL = 'UPDATE_INTERVAL';
const UPDATE_TIME = 'UPDATE_TIME';
const TOGGLE_ANIM = 'TOGGLE_ANIM';


//redux action creators_____________________________________________
export const updateSessionLength = (length) => {
  return {
   type: UPDATE_SESSION_LENGTH,
   sessionLength: length
  };
};

export const updateBreakLength = (length) => {
  return {
   type: UPDATE_BREAK_LENGTH,
   breakLength: length
  };
};

export const updatePlayState = (bool) => {
  return {
   type: UPDATE_PLAY_STATE,
   play: bool
  };
};

export const updateItInterval = (id) => {
  return {
   type: UPDATE_INTERVAL,
   interval: id
  };
};

export const updateTime = (time) => {
  return {
   type: UPDATE_TIME,
   time: time
  };
};

export const toggleAnim = (className) => {
  return {
   type: TOGGLE_ANIM,
   toggleAnimClass: className
  };
};
//--------------------------------------------------------------------


//redux reducer function_____________________________________________
const reducer = (state = {sessionLength: 25, breakLength: 5, play: false, interval: null, time: '25:00', toggleAnimClass: ''}, action) => {
  switch(action.type){
    case UPDATE_SESSION_LENGTH : return {sessionLength: action.sessionLength, breakLength: state.breakLength, play: state.play, interval: state.interval, time: state.time, toggleAnimClass: state.toggleAnimClass};
    case UPDATE_BREAK_LENGTH : return {breakLength: action.breakLength, sessionLength: state.sessionLength, play: state.play, interval: state.interval, time: state.time, toggleAnimClass: state.toggleAnimClass};
    case UPDATE_PLAY_STATE : return {play: action.play, breakLength: state.breakLength, sessionLength: state.sessionLength, interval: state.interval, time: state.time, toggleAnimClass: state.toggleAnimClass};
    case UPDATE_INTERVAL : return {interval: action.interval, play: state.play, breakLength: state.breakLength, sessionLength: state.sessionLength, time: state.time, toggleAnimClass: state.toggleAnimClass};
    case UPDATE_TIME : return {time: action.time, interval: state.interval, play: state.play, breakLength: state.breakLength, sessionLength: state.sessionLength, toggleAnimClass: state.toggleAnimClass};
    case TOGGLE_ANIM : return {toggleAnimClass: action.toggleAnimClass, time: state.time, interval: state.interval, play: state.play, breakLength: state.breakLength, sessionLength: state.sessionLength};
    default: return state;
  };
};
//----------------------------------------------------------------



const store = createStore(reducer);

export default store;
