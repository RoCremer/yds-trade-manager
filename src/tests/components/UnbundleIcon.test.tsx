import React from 'react';
import { mount } from 'enzyme';
import UnbundleIcon from '@components/Icons/UnbundleIcon.tsx';

// Simple test to get things going
describe('<UnbundleIcon />', () => {
  it('runs successfully', () => {
    const wrapper = mount(<UnbundleIcon className="test" />);
    expect(wrapper.exists('.test')).toBe(true);
  });
});
