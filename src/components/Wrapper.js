import React from 'react'
import $ from 'jquery'
import asyncComponent from './asyncComponent/async';
//import Label from './Label'
//import Clock from './Clock'
import '../sass/02-utilities/_animation.scss';
//import {connect} from 'react-redux'
import '@fortawesome/fontawesome-free/css/all.css'

//dynamic import
const Label = asyncComponent(() =>
    	    import('./Label').then(module => module.default)
    	);


const Clock = asyncComponent(() =>
         import('./Clock').then(module => module.default)
    );


var requestInterval = require('request-interval');


class Wrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: '25:00',
      play: true,
      sessionLength: 25,
      breakLength: 5,
      interval: null
    }
    this.handlePlay = this.handlePlay.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.switchBreakState = false;
    this.animate =  this.animate.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);
    this.genTime = this.genTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.incSession = this.incSession.bind(this);
    this.decSession = this.decSession.bind(this);
    this.incBreak = this.incBreak.bind(this);
    this.decBreak = this.decBreak.bind(this);
  }

//start - stop the timer
  handlePlay(){
    $('#play').toggleClass('fa-play');
    $('#play').toggleClass('fa-pause');
    this.setState(function(prevState, props){
      return {play: !prevState.play}
   });
    if(this.state.play){
      this.setState({interval: this.startTimer()});
    }
    else{
      requestInterval.clear(this.state.interval);
    }
  }


startTimer(){
  return  requestInterval(1000, function() {
             var seconds = this.state.time.split(':')[1];
             var minutes = this.state.time.split(':')[0];
             var regex = /^\d{2}$/;
             if(minutes == 0 && seconds == 0){
                requestInterval.clear(this.state.interval);
                this.switchBreakState = !this.switchBreakState;
                minutes = (this.switchBreakState) ? this.state.breakLength : this.state.sessionLength;
                this.switchBreakState ? $('#text').text('BREAK') : $('#text').text('SESSION');
                this.setState({interval: this.startTimer()});
             }
             else if(seconds != 0){
                  seconds = seconds - 1;
            }else{
                  seconds = 59;
                  minutes = minutes -1;
            }

            (minutes == 0) ? this.animate() : this.stopAnimation();
            if(regex.test(seconds)){
               var time =  regex.test(minutes) ? this.genTime(minutes, seconds) : this.genTime('0' + minutes, seconds);
            }else {
               var time =  regex.test(minutes) ? this.genTime(minutes,'0' + seconds) : this.genTime('0' + minutes,'0' + seconds);
            }
            this.setState({time: time});
            }.bind(this));
  }

handleRefresh(){
  $('#text').text('SESSION');
  $('.fa-pause').removeClass('fa-pause').addClass('fa-play', 200);
  this.stopAnimation();
  requestInterval.clear(this.state.interval);
  this.setState({time: '25:00'});
}


animate(){
  $('.clock').css('border', '4px solid #013235');
  $('.clock').css('box-shadow', '0px 3px 5px #FF6D00 inset');
}

stopAnimation(){
    $('.clock').css('border', '4px solid #0d252d');
    $('.clock').css('box-shadow', '0px 3px 5px rgba(244, 244, 244, 0.3) inset');
}

genTime(minutes, seconds) {
    var time = '' + minutes + ':' + seconds;
    return time;
}

incSession(){
  if(this.state.sessionLength < 60){
  var time = (this.state.sessionLength + 1) + ':00';
  this.setState({sessionLength: this.state.sessionLength + 1});
  if(!this.switchBreakState){
    this.setState({time: time});
  }
 }
}

decSession(){
  if(this.state.sessionLength > 0){
  var time = (this.state.sessionLength - 1) + ':00';
  this.setState({sessionLength: this.state.sessionLength - 1});
  if(!this.switchBreakState){
    this.setState({time: time});
  }
 }
}

incBreak(){
  if(this.state.breakLength < 60){
  var time = (this.state.breakLength + 1) + ':00';
  this.setState({breakLength: this.state.breakLength + 1});
  if(this.switchBreakState){
    this.setState({time: time});
  }
 }
}

decBreak(){
  if(this.state.breakLength > 0){
  var time = (this.state.breakLength - 1) + ':00';
  this.setState({breakLength: this.state.breakLength - 1});
  if(this.switchBreakState){
    this.setState({time: time});
  }
 }
}

  render() {
    return (
      <div class='back'>
        <i id='play' class='fa fa-play' onClick={this.handlePlay}></i>
        <Clock time={this.state.time} onClick={this.handleRefresh}/>
        <div className='wrap-label'>
        <Label id='session-label' text='SESSION LENGTH' length={this.state.sessionLength} increment={this.incSession} decrement={this.decSession}/>
        <Label id='break-label' text='BREAK LENGTH' length={this.state.breakLength} increment={this.incBreak} decrement={this.decBreak}/>
        </div>
      </div>
    )
  }
}


export default Wrapper ;
