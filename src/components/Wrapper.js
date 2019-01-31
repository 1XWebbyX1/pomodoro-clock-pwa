import React from 'react'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay} from '@fortawesome/free-solid-svg-icons'
import Label from './Label/Label'
import Clock from './Clock/Clock'


var requestInterval = require('request-interval');


class Wrapper extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: '25:00',
      play: false,
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
    this.genTimer = this.genTimer.bind(this);
    this.checkAndPlayAudio = this.checkAndPlayAudio.bind(this);
    this.incSession = this.incSession.bind(this);
    this.decSession = this.decSession.bind(this);
    this.incBreak = this.incBreak.bind(this);
    this.decBreak = this.decBreak.bind(this);
  }

//start - stop the timer
  handlePlay(){
    //$('#play').toggleClass('fa-play');
    //$('#play').toggleClass('fa-pause');
    this.props.updatePlay(!this.props.play); // update boolean state with redux
    if(!this.props.play){
      this.props.updateInterval(this.startTimer()); //initiate the timer
    }
    else{
      requestInterval.clear(this.props.interval); //stop timer
      this.audioBeep.pause(); //stop audio if playing
    }
  }


startTimer(){
  return  requestInterval(1000, function() {
             var regex = /^\d{2}$/;
             var minutes = this.genTimer().minutes;
             var seconds = this.genTimer().seconds;
            //animate when less than 1 minute
            (minutes == 0) ? this.animate() : this.stopAnimation();
            this.checkAndPlayAudio(minutes, seconds);

            if(regex.test(seconds)){
               var time =  (regex.test(minutes)) ? this.genTime(minutes, seconds) : this.genTime('0' + minutes, seconds); // if minutes are single digit append 0 to start
            }else {//if seconds are single digit append 0 to start
                time =  (regex.test(minutes)) ? this.genTime(minutes,'0' + seconds) : this.genTime('0' + minutes,'0' + seconds);
            }
           this.props.updateTime(time);
            }.bind(this));
  }

genTimer(){
  var seconds = this.props.time.split(':')[1];
  var minutes = this.props.time.split(':')[0];
  if(minutes == 0 && seconds == 0){
     requestInterval.clear(this.props.interval);
     this.switchBreakState = !this.switchBreakState;
     minutes = (this.switchBreakState) ? this.props.breakLength : this.props.sessionLength;
     this.switchBreakState ? $('#text').text('BREAK') : $('#text').text('SESSION');
     this.props.updateInterval(this.startTimer());
  }
  else if(seconds != 0){
       seconds = seconds - 1;
 }else{
       seconds = 59;
       minutes = minutes -1;
 }
 return {minutes: minutes, seconds: seconds};
}


checkAndPlayAudio(minutes, seconds){
  var promise = this.audioBeep.play();
  console.log(promise);
     if (promise !== undefined) {
       console.log('here');
        this.audioBeep.currentTime = 0;
        promise.then(() => {
        (minutes == 0 && seconds <= 5) ? this.audioBeep.play() : this.audioBeep.pause();
        }).catch(error => {
          // Autoplay was prevented.
           console.log('Autoplay not supported by browser');
         });
     }
 }


handleRefresh(){
  $('#text').text('SESSION');
  $('.fa-pause').removeClass('fa-pause').addClass('fa-play', 200);
  this.stopAnimation();
  if(this.props.interval){
    requestInterval.clear(this.props.interval);
  }
  this.props.updateTime('25:00');
  this.props.updatePlay(false);
  this.props.updateSession(25);
  this.props.updateBreak(5);
  this.switchBreakState = false;
}


animate(){
  $('.clock').css('border', '4px solid #013235');
  $('.clock').css('box-shadow', '0px 3px 5px #FF6D00 inset');
}

stopAnimation(){
    $('.clock').css('border', '4px solid #0d252d');
    $('.clock').css('box-shadow', '0px 3px 5px rgba(244, 244, 244, 0.3) inset');
    this.audioBeep.pause();
}

genTime(minutes, seconds) {
    var time = '' + minutes + ':' + seconds;
    return time;
}

incSession(){
  if(this.props.sessionLength < 60){
  var time = (this.props.sessionLength + 1) + ':00';
  this.props.updateSession(this.props.sessionLength + 1);
  if(!this.switchBreakState){
    this.props.updateTime(time);
  }
 }
}

decSession(){
  if(this.props.sessionLength > 0){
  var time = (this.props.sessionLength - 1) + ':00';
  this.props.updateSession(this.props.sessionLength - 1);
  if(!this.switchBreakState){
     this.props.updateTime(time);
  }
 }
}

incBreak(){
  if(this.props.breakLength < 60){
  var time = (this.props.breakLength + 1) + ':00';
  this.props.updateBreak(this.props.breakLength + 1);
  if(this.switchBreakState){
    this.props.updateTime(time);
  }
 }
}

decBreak(){
  if(this.props.breakLength > 0){
  var time = (this.props.breakLength - 1) + ':00';
  this.props.updateBreak(this.props.breakLength - 1);
  if(this.switchBreakState){
    this.props.updateTime(time);
  }
 }
}

  render() {
    return (
      <div className='back'>
        <FontAwesomeIcon id='play' icon={faPlay} onClick={this.handlePlay}/>
        <Clock time={this.props.time} onClick={this.handleRefresh}/>
        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={(audio) => { this.audioBeep = audio; }} />
        <div className='wrap-label'>
        <Label id='session-label' text='SESSION LENGTH' length={this.props.sessionLength} increment={this.incSession} decrement={this.decSession}/>
        <Label id='break-label' text='BREAK LENGTH' length={this.props.breakLength} increment={this.incBreak} decrement={this.decBreak}/>
        </div>
      </div>
    )
  }
}


export default Wrapper ;
