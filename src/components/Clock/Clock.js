import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'

class Clock extends React.Component {
    render() {
      return (
        <div class="clock">
          <p id='text'>SESSION</p>
          <time id='time'>{this.props.time}</time>
          <i className='refresh fa fa-sync-alt' onClick={this.props.onClick}></i>
        </div>
      );
    }
}

export default Clock;
