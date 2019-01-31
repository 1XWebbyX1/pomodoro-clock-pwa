import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt} from '@fortawesome/free-solid-svg-icons'

const Clock = React.forwardRef((props, ref) => (
  <div className={"clock " + props.animClass} >
    <p ref={ref} id='text'>SESSION</p>
    <time id='time'>{props.time}</time>
    <FontAwesomeIcon className='refresh' icon={faSyncAlt} onClick={props.onClick}/>
  </div>
));

export default Clock;
