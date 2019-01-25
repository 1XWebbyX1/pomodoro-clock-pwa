import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'

class Label extends React.Component {
    render() {
      return (
        <div id={this.props.id} class='label'>
        <p class='head'>{this.props.text}</p>
        <hr class='line' />
        <div class='inline'>
        <div className='wrap-plus inc' onClick={this.props.increment}><i class='fa fa-plus'></i></div>
        <p class='length'>{this.props.length}</p>
        <div className='wrap-minus dec' onClick={this.props.decrement}><i  class='fa fa-minus'></i></div>
        </div>
      </div>
      );
    }
}

export default Label;
