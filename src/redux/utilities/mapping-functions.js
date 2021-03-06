import * as mapModule from '../store'

//mapping state and props to Redux to manage state-------
export  const mapStateToProps = (state)  => {
  return {
    sessionLength : state.sessionLength,
    breakLength: state.breakLength,
    play: state.play,
    interval: state.interval,
    time: state.time,
    toggleAnimClass: state.toggleAnimClass
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    updateSession : function(length) {
        dispatch(mapModule.updateSessionLength(length));
    },
    updateBreak : function(length) {
        dispatch(mapModule.updateBreakLength(length));
    },
    updatePlay : function(bool) {
        dispatch(mapModule.updatePlayState(bool));
    },
    updateInterval : function(id) {
        dispatch(mapModule.updateItInterval(id));
    },
    updateTime : function(time) {
        dispatch(mapModule.updateTime(time));
    },
    toggleAnim : function(className) {
        dispatch(mapModule.toggleAnim(className));
    }
  };
};
