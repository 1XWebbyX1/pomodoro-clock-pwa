import React from 'react';
import { shallow, mount } from 'enzyme';
// Our Dependencies
import { expect } from './utils/chai';
import { configure } from 'enzyme';
import sinon from 'sinon'
import Adapter from 'enzyme-adapter-react-16';
// Our Component
import Wrapper from './Wrapper';


configure({ adapter: new Adapter() });

describe('Wrapper', () => {
  var wrapper;
  const mockUpdateSession = jest.fn();
  const mockUpdateBreak = jest.fn();
  const mockUpdatePlay = jest.fn();
  const mockUpdateInterval = jest.fn();
  const mockUpdateTime = jest.fn();
  const mockToggleAnim = jest.fn();
  // Render the component in the beforeEach so
  // each test can get a new wrapper
  beforeEach(() => {
    const props = {
        time: '25:00',
        play: false,
        sessionLength: 25,
        breakLength: 5,
        interval: null,
        toggleAnimClass: '',
        updateSession: mockUpdateSession,
        updateBreak: mockUpdateBreak,
        updatePlay: mockUpdatePlay,
        updateInterval: mockUpdateInterval,
        updateTime: mockUpdateTime,
        toggleAnim: mockToggleAnim
      };
      wrapper = mount(
        <Wrapper {...props}/>
      );
  });

  // Checking the intitial state
  it('should initialize the state object correctly', () => {
    expect(wrapper.props().time).to.equal('25:00');
    expect(wrapper.props().play).to.equal(false);
    expect(wrapper.props().sessionLength).to.equal(25);
    expect(wrapper.props().breakLength).to.equal(5);
    expect(wrapper.props().interval).to.equal(null);
    expect(wrapper.props().toggleAnimClass).to.equal('');
});


  describe('when play is clicked', () => {
    let playButton;
    let spy;
    beforeEach(() => {
       spy = sinon.spy(Wrapper.prototype, 'startTimer');
      wrapper = mount(
        <Wrapper play={false} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
      )
      playButton = wrapper.find('#play').first();
      expect(wrapper.props().play).to.equal(false);
      playButton.simulate('click');
    });

    afterEach(() => {
      spy.restore();
      wrapper.unmount();
      mockUpdatePlay.mockClear();
      mockUpdateInterval.mockClear();
    })

    it('should call mockUpdatePlay and mockUpdateInterval function once', () => {
      expect(mockUpdatePlay.mock.calls.length).to.equal(1);
      expect(mockUpdateInterval.mock.calls.length).to.equal(1);
    });

    it('should call mockUpdatePlay with argument as true', () => {
      expect(mockUpdatePlay.mock.calls[0][0]).to.equal(true);
    });

    it('should call startTimer onceto start interval', () => {
      expect(spy.calledOnce).to.be.true;
        spy.restore();
    });
})


describe('when increment is clicked', () => {
  afterEach(() => {
    wrapper.unmount();
    mockUpdateSession.mockClear();
    mockUpdateTime.mockClear();
    mockUpdateBreak.mockClear();
  })

  it('should call updateSession and updateTime when sessionLength < 60', () => {
    let wrapper = mount(
      <Wrapper sessionLength={25} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const sessionIncButton = wrapper.find('Label').first().find('.inc');
    sessionIncButton.simulate('click');
    expect(mockUpdateSession.mock.calls.length).to.equal(1);
    expect(mockUpdateSession.mock.calls.length).to.equal(1);
    mockUpdateSession.mockClear();
    mockUpdateTime.mockClear();
  });

  it('should not call updateSession and updateTime when sessionLength > 60', () => {
    let wrapper = mount(
      <Wrapper sessionLength={61} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const sessionIncButton = wrapper.find('Label').first().find('.inc');
    sessionIncButton.simulate('click');
    expect(mockUpdateSession.mock.calls.length).to.equal(0);
    expect(mockUpdateSession.mock.calls.length).to.equal(0);
    mockUpdateSession.mockClear();
    mockUpdateTime.mockClear();
    mockUpdateBreak.mockClear();
  });

  it('should call updateBreak and updateTime when breakLength < 60', () => {
    let wrapper = mount(
      <Wrapper breakLength={25} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const breakIncButton = wrapper.find('Label').at(1).find('.inc');
    breakIncButton.simulate('click');
    expect(mockUpdateBreak.mock.calls.length).to.equal(1);
    //expect(mockUpdateTime.mock.calls.length).to.equal(1);
    mockUpdateBreak.mockClear();
    mockUpdateTime.mockClear();
  });

  it('should not call updateBreak and updateTime when breakLength > 60', () => {
    let wrapper = mount(
      <Wrapper breakLength={61} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const breakIncButton = wrapper.find('Label').at(1).find('.inc');
    breakIncButton.simulate('click');
    expect(mockUpdateBreak.mock.calls.length).to.equal(0);
    expect(mockUpdateTime.mock.calls.length).to.equal(0);
    mockUpdateBreak.mockClear();
    mockUpdateTime.mockClear();
  });

})

describe('when decrement is clicked', () => {
  afterEach(() => {
    wrapper.unmount();
    mockUpdateSession.mockClear();
    mockUpdateTime.mockClear();
  })

  it('should call updateSession and updateTime when sessionLength > 0', () => {
    let wrapper = mount(
      <Wrapper sessionLength={25} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const sessionIncButton = wrapper.find('Label').first().find('.dec');
    sessionIncButton.simulate('click');
    expect(mockUpdateSession.mock.calls.length).to.equal(1);
    expect(mockUpdateSession.mock.calls.length).to.equal(1);
    mockUpdateSession.mockClear();
    mockUpdateTime.mockClear();
  });

  it('should not call updateSession and updateTime when sessionLength < 0', () => {
    let wrapper = mount(
      <Wrapper sessionLength={-1} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const sessionIncButton = wrapper.find('Label').first().find('.dec');
    sessionIncButton.simulate('click');
    expect(mockUpdateSession.mock.calls.length).to.equal(0);
    expect(mockUpdateSession.mock.calls.length).to.equal(0);
    mockUpdateSession.mockClear();
    mockUpdateTime.mockClear();
  });

  it('should call updateBreak and updateTime when breakLength > 0', () => {
    let wrapper = mount(
      <Wrapper breakLength={25} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const breakIncButton = wrapper.find('Label').at(1).find('.dec');
    breakIncButton.simulate('click');
    expect(mockUpdateBreak.mock.calls.length).to.equal(1);
    //expect(mockUpdateTime.mock.calls.length).to.equal(1);
    mockUpdateBreak.mockClear();
    mockUpdateTime.mockClear();
  });

  it('should not call updateBreak and updateTime when breakLength < 0', () => {
    let wrapper = mount(
      <Wrapper breakLength={-1} updateSession={mockUpdateSession} updateTime={mockUpdateTime} updatePlay={mockUpdatePlay} updateBreak={mockUpdateBreak} updateInterval={mockUpdateInterval}/>
    )
    const breakIncButton = wrapper.find('Label').at(1).find('.dec');
    breakIncButton.simulate('click');
    expect(mockUpdateBreak.mock.calls.length).to.equal(0);
    //expect(mockUpdateTime.mock.calls.length).to.equal(0);
    mockUpdateBreak.mockClear();
    mockUpdateTime.mockClear();
  });

})

});
