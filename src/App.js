import React from 'react';
import Wrapper from './components/Wrapper.js'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './App.scss';

class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <Wrapper />
       </Provider>
    )
  }
}

export default App;
