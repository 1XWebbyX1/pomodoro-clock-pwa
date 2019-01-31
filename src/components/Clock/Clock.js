import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'

class Clock extends React.Component {
    render() {
      return (
        <div class="clock">
          <p id='text'>SESSION</p>
          <time id='time'>{this.props.time}</time>
          <FontAwesomeIcon className='refresh' icon={faSyncAlt} onClick={this.props.onClick}/>
        </div>
      );
    }
}

export default Clock;
