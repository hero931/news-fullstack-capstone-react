import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default function Intro(props) {
    return (
        <main className="intro-page hide-me">
            <section id="intro-section">
                <div className="container">
                    <h1 className="introA">News Beast</h1>
                    <h2 className="introB">fresh media</h2>
                    <h4>In this app you can find the latest news.<br /> Also you can find what were the top news on day you were born.<br /> Give it a try..</h4>
                </div>
            </section>
        </main>
    )
}
