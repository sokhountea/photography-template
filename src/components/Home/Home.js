import React, { Component } from 'react';

import './Home.scss';

import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    <FadeIn
                        className="header-text"
                        delay={150}
                    >
                        <h1>Sokhountea Sy</h1>
                        <h2>photographer</h2>
                        <ul className="links list">
                            <li><Link to="/portfolio">Portfolio</Link></li>
                            <li></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </FadeIn>
                </header>
            </div>
        )
    }
}

export default Home;
