import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TagCount from './TagCount';

describe('TagCount component', () => {
    it('should render a tag count with no value', () => {
        const wrapper = shallow(<TagCount/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render a tag count of 44', () => {
        const wrapper = shallow(<TagCount count="44"/>)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})
