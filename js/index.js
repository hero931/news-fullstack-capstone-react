import React from 'react';
import ReactDOM from 'react-dom';
const render = ReactDOM.render;
import {
    Provider
} from 'react-redux';


import Header from '../js/components/header';
import Intro from '../js/components/intro';


document.addEventListener('DOMContentLoaded', () => {
    return ReactDOM.render( <Header /> ,
        document.getElementById('reactHeader'));
});

document.addEventListener('DOMContentLoaded', () => {
    return ReactDOM.render( <Intro /> ,
        document.getElementById('reactIntro'));
});
