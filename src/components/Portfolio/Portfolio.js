import React, { Component } from 'react';
import FadeIn from 'react-fade-in';

// Styles
import './Portfolio.scss';

// Libraries
import { Link, Route } from 'react-router-dom';
import { elementScrollIntoView } from "seamless-scroll-polyfill";

// Component
import Gallery from './Gallery';

var allImages = [];
var archiveImages = [];
var sceneryImages = [];

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navOpen: false
        };
        this.shuffleArray = this.shuffleArray.bind(this);
        this.scrollToNode = this.scrollToNode.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        archiveImages = this.importAll(require.context('../../images/archive', false, /\.(png|jpe?g|svg)$/));
        sceneryImages = this.importAll(require.context('../../images/sceneries', false, /\.(png|jpe?g|svg)$/));
        allImages = this.shuffleArray([].concat(archiveImages, sceneryImages));
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll);
        window.addEventListener('load', this.listenToScroll);
        document.addEventListener('mousedown', this.handleClickOutside);
        window.scrollTo(0, 0);
        document.body.style.overflow = 'auto';
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
        window.removeEventListener('load', this.listenToScroll);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    importAll(r) {
        return r.keys().map(r);
    }

    // Given an array, shuffles the item in it
    shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    // Scrolls to section
    scrollToNode(node) {
        elementScrollIntoView(node, { behavior: "smooth" });
    }

    // Shows the arrow if not at the top of the page
    listenToScroll() {
        if (window.pageYOffset > 0) {
            document.getElementById('arrow-up').classList.add('show');
        } else {
            document.getElementById('arrow-up').classList = 'scroll-up';
        }
    }

    // Handles click outside of the collapsible menu
    handleClickOutside(e) {
        if (!this.state.navOpen || this.burger.contains(e.target)) {
            return;
        }
        else if (!this.menu.contains(e.target) || this.link1.contains(e.target) || this.link2.contains(e.target) || this.link3.contains(e.target)) {
            this.handleMenuClick();
        }
    }

    // Handles when clicking on hamburger
    handleMenuClick() {
        if (!this.state.navOpen) {
            document.getElementById('navigation').classList.add('open');
            document.getElementById('collapsible').classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            document.getElementById('navigation').classList = 'navigation';
            document.getElementById('collapsible').classList = 'collapsible';
            document.body.style.overflow = 'auto';
        }
        this.setState({ navOpen: !this.state.navOpen });
    }

    render() {
        return (
            <div className="Portfolio">
                {!this.state.navOpen ? <div className="overlay"></div> : <div className="overlay open"></div>}
                <FadeIn delay={500}>
                    <span id="arrow-up" className="scroll-up" onClick={() => this.scrollToNode(this.header)}>
                        <i className="fas fa-sort-up"></i>
                    </span>
                </FadeIn>
                <header ref={(node) => this.header = node} className="Porfolio-header">
                    <FadeIn>
                        <Link to="/">Sokhountea Sy</Link>
                    </FadeIn>
                </header>
                <nav className="navigation" id="navigation">
                    <FadeIn
                        delay={150}
                        className="nav links"
                    >
                        <Link to="/portfolio">All</Link>
                        <Link to="/portfolio/archive">Tumblr Archive</Link>
                        <Link to="/portfolio/sceneries">Sceneries</Link>
                    </FadeIn>
                    <FadeIn>
                        <div className="box" ref={(node) => this.burger = node} onClick={() => this.handleMenuClick()}>
                            <div className="hamburger" id="hamburger">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </FadeIn>
                </nav>
                <div className="collapsible" id="collapsible" ref={(node) => this.menu = node}>
                    <ul>
                        <li><Link to="/portfolio" ref={(node) => this.link1 = node}>All</Link></li>
                        <li><Link to="/portfolio/archive" ref={(node) => this.link2 = node} >Tumblr Archive</Link></li>
                        <li><Link to="/portfolio/sceneries" ref={(node) => this.link3 = node} >Sceneries</Link></li>
                        <li><Link to="/contact" className="link">Contact Me</Link></li>
                    </ul>
                </div>
                <Route exact path="/portfolio">
                    <Gallery array={allImages} />
                </Route>
                <Route path="/portfolio/archive">
                    <Gallery array={archiveImages} />
                </Route>
                <Route path="/portfolio/sceneries">
                    <Gallery array={sceneryImages} />
                </Route>
                <footer>
                    <FadeIn>
                        <div className="top">
                            <div className="social-info">
                                <h1>Sokhountea Sy</h1>
                                <h2>- photographer</h2>
                                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
                            </div>
                            <div>
                                <p>+1 111 111 1111</p>
                                <p>email@email.com</p>
                                <div className="contact-links"><Link to="/contact" className="link">Contact Me</Link></div>
                            </div>
                        </div>
                        <div className="bottom">
                            <p>Template by <a href="https://sokhountea.github.io/" target="_blank" rel="noreferrer">Sokhountea Sy</a></p>
                        </div>
                    </FadeIn>
                </footer>
            </div >
        )
    }
}

export default Portfolio;
