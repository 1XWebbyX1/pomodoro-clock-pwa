import React from 'react';
import Wrapper from './components/Wrapper.js'
import { Provider, connect } from 'react-redux'
import store from './redux/store.js'
import {mapStateToProps} from './redux/utilities/mapping-functions'
import {mapDispatchToProps} from './redux/utilities/mapping-functions'
import './App.scss';

const Container = connect(mapStateToProps, mapDispatchToProps)(Wrapper);

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Container />
       </Provider>
    )
  }
}

export default App;
