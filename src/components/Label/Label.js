import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'

class Label extends React.Component {
    render() {
      return (
        <div id={this.props.id} className='label'>
        <p className='head'>{this.props.text}</p>
        <hr className='line' />
        <div className='inline'>
        <div className='wrap-plus inc' onClick={this.props.increment}><FontAwesomeIcon icon={faPlus}/></div>
        <p className='length'>{this.props.length}</p>
        <div className='wrap-minus dec' onClick={this.props.decrement}><FontAwesomeIcon icon={faMinus}/></div>
        </div>
      </div>
      );
    }
}

export default Label;
