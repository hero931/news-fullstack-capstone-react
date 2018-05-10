import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default function Header(props) {
    return (
        <header role="banner">
            <div>
                <span className="logo-header">nb</span>
            </div>
            <div id="sidebar">
                <ul>
                    <button id="sidebar-close">&times;</button>
                    <li><a id="home" href="#">Home</a></li>
                    <li><a id="sports" href="#">Sports</a></li>
                    <li><a id="arts" href="#">Arts</a></li>
                    <li><a id="search" href="#">Search</a></li>
                    <li><a id="favorite" href="#">Favorite List</a></li>
                </ul>
                <div id="sidebar-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    )
}
