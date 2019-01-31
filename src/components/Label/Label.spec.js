// External Depedencies
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
// Our Dependencies
import { expect } from '../utils/chai';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
// Our Component
import Label from './Label';


configure({ adapter: new Adapter() });

describe('Label', () => {
  const incSession = () => {};
  const decSession = () => {});

  it("renders correctly", () => {
     const output = renderer.create(
        <Label id='session-label' text='SESSION LENGTH' length={24} increment={incSession} decrement={decSession}/>
   ).toJSON();
     expect(output).to.matchSnapshot(); //this will confirm content received through props
  });

})
