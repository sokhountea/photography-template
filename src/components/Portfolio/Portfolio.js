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
        archiveImages = this.importAll(require.context('../../images/archive', false, /\.(png|jpe?g|svg)$/));
        sceneryImages = this.importAll(require.context('../../images/sceneries', false, /\.(png|jpe?g|svg)$/));
        allImages = [].concat(archiveImages, sceneryImages);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.scrollToNode = this.scrollToNode.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll);
        window.addEventListener('load', this.listenToScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
        window.removeEventListener('load', this.listenToScroll);
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

    render() {
        return (
            <div className="Portfolio">
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
                <nav>
                    <FadeIn
                        delay={150}

                    >
                        <Link to="/portfolio">All</Link>
                        <Link to="/portfolio/archive">Tumblr Archive</Link>
                        <Link to="/portfolio/sceneries">Sceneries</Link>
                    </FadeIn>
                </nav>
                <Route exact path="/portfolio">
                    <Gallery array={this.shuffleArray(allImages)} />
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
