import * as React from 'react';
import { render } from 'react-dom';
import IconPicker from './src';

const icons = [
  'fas fa-camera',
  'fas fa-fish',
  'fas fa-align-center',
  'fas fa-align-justify'
];

const App = () => {

  const [state, setState] = React.useState({
    icon: ''
  });

  return (<>
    <div>
      <span className={state.icon}></span>
    </div>
    <IconPicker 
      icons={icons} 
      defaultValue="fas fa-camera" 
      onChange={(icon) => {
        setState({
          ...state,
          icon
        })
      }}
    />
  </>);
}

render(<App />, document.getElementById('root'))