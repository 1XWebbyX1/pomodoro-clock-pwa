import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'

class Label extends React.Component {
    render() {
      return (
        <div id={this.props.id} class='label'>
        <p class='head'>{this.props.text}</p>
        <hr class='line' />
        <div class='inline'>
        <i id='inc' class='fa fa-plus inc' onClick={this.props.increment}></i>
        <p class='length'>{this.props.length}</p>
        <i  class='fa fa-minus dec' onClick={this.props.decrement}></i>
        </div>
      </div>
      );
    }
}

export default Label;
