// External Depedencies
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Clock from './Clock';


configure({ adapter: new Adapter() });

describe('Clock', () => {
  const onClick = jest.fn();

  it("renders correctly", () => {
     const output = renderer.create(
         <Clock time="24:00" onClick={onClick}/>
   ).toJSON();
     expect(output).to.matchSnapshot(); //this will confirm content received through props
  });

})
