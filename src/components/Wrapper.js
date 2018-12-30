import React from 'react'
import $ from 'jquery'
import asyncComponent from './asyncComponent/async';
import {connect} from 'react-redux'
import {mapStateToProps} from '../redux/utilities/mapping-functions'
import {mapDispatchToProps} from '../redux/utilities/mapping-functions'
import '../sass/02-utilities/_animation.scss';
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
    this.incSession = this.incSession.bind(this);
    this.decSession = this.decSession.bind(this);
    this.incBreak = this.incBreak.bind(this);
    this.decBreak = this.decBreak.bind(this);
  }

//start - stop the timer
  handlePlay(){
    $('#play').toggleClass('fa-play');
    $('#play').toggleClass('fa-pause');
    this.props.updatePlay(!this.props.play);
    if(!this.props.play){
      this.props.updateInterval(this.startTimer());
    }
    else{
      requestInterval.clear(this.props.interval);
    }
  }


startTimer(){
  return  requestInterval(1000, function() {
             var seconds = this.props.time.split(':')[1];
             var minutes = this.props.time.split(':')[0];
             var regex = /^\d{2}$/;
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

            (minutes == 0) ? this.animate() : this.stopAnimation();
            if(regex.test(seconds)){
               var time =  (regex.test(minutes)) ? this.genTime(minutes, seconds) : this.genTime('0' + minutes, seconds);
            }else {
               var time =  (regex.test(minutes)) ? this.genTime(minutes,'0' + seconds) : this.genTime('0' + minutes,'0' + seconds);
            }
           this.props.updateTime(time);
            }.bind(this));
  }

handleRefresh(){
  $('#text').text('SESSION');
  $('.fa-pause').removeClass('fa-pause').addClass('fa-play', 200);
  this.stopAnimation();
  requestInterval.clear(this.props.interval);
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
      <div class='back'>
        <i id='play' class='fa fa-play' onClick={this.handlePlay}></i>
        <Clock time={this.props.time} onClick={this.handleRefresh}/>
        <div className='wrap-label'>
        <Label id='session-label' text='SESSION LENGTH' length={this.props.sessionLength} increment={this.incSession} decrement={this.decSession}/>
        <Label id='break-label' text='BREAK LENGTH' length={this.props.breakLength} increment={this.incBreak} decrement={this.decBreak}/>
        </div>
      </div>
    )
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Wrapper) ;
