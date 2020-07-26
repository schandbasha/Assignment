import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, queryAllByPlaceholderText} from "@testing-library/react";
import renderer from 'react-test-renderer';
import  Home  from './../Home';

it('renders without crashing', () => {
const div = document.createElement('div');
ReactDOM.render(<Home />, div);
ReactDOM.unmountComponentAtNode(div);
});
