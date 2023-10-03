import React, { Component } from 'react';
import FadeIn from 'react-fade-in';

// Styles
import './Portfolio.scss';

// Libraries
import { Link, Route } from 'react-router-dom';
import { elementScrollIntoView } from "seamless-scroll-polyfill";
import styled from 'styled-components'

// Component
import Gallery from './Gallery';
import ImageModal from './ImageModal';

var allImages = [];
var archiveImages = [];
var sceneryImages = [];

const Item = styled.span`
    border-width:1px;    
    border-top-style:solid;
    border-top-color: ${props => props.active ? `black` : `white`};

    &:hover {
        border-top-color: black;
    }

    @media (max-width: 600px) {
        display: ${props => props.active ? `inline` : `none`};
        border-top-color: white;
    }
`

const CollapsibleItem = styled.span`
    border-width:1px;    
    border-top-style:solid;
    border-top-color: white;

    &:hover {
        border-top-color: black;
    }
`

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.scrollToNode = this.scrollToNode.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleImageModalClose = this.handleImageModalClose.bind(this);
        archiveImages = this.importAll(require.context('../../images/archive', false, /\.(png|jpe?g|svg)$/));
        sceneryImages = this.importAll(require.context('../../images/sceneries', false, /\.(png|jpe?g|svg)$/));
        allImages = this.shuffleArray([].concat(archiveImages, sceneryImages));
        this.state = {
            showImageModal: false,
            selectedImage: {
                src: null,
                dims: {
                    width: 0,
                    height: 0
                }
            },
            navOpen: false,
            currentGallery: window.location.hash
        };
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
        this.setState({
            navOpen: !this.state.navOpen,
            currentGallery: window.location.hash
        });
    }

    // Handles when clicking on a navigation item
    handleItemClick() {
        setTimeout(() => {
            this.setState({
                currentGallery: window.location.hash
            });
        }, 200);
    }

    handleImageClick = async (image) => {
        if (image?.default) {
            // Get image dimensions
            await this.getImageWidthHeight(image)
                .then((res) => {
                    this.setState({
                        showImageModal: true,
                        selectedImage: {
                            src: image.default,
                            dims: {
                                width: res.width,
                                height: res.height
                            }
                        }
                    });

                    setTimeout(() => {
                        // document.body.style.paddingRight = '0px';
                    }, 50);
                })
                .catch(() => console.error("Image doesn't exist."));
        }
    }

    handleImageModalClose() {
        this.setState({
            showImageModal: false
        });
    }

    // Function to get image dimensions
    getImageWidthHeight(image) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.default;

            img.onload = function () {
                document.body.appendChild(this);
                const width = this.width;
                const height = this.height;
                document.body.removeChild(this);
                resolve({
                    width: width,
                    height: height
                })
            };
            img.onerror = reject;
        })
    }

    render() {
        return (
            <div className="Portfolio">
                {!this.state.navOpen ? <div className="overlay"></div> : <div className="overlay open"></div>}
                <ImageModal
                    show={this.state.showImageModal}
                    selectedImage={this.state.selectedImage}
                    handleImageModalClose={this.handleImageModalClose}
                />
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
                        <Link to="/portfolio" onClick={() => this.handleItemClick()} >
                            <Item active={this.state.currentGallery === '#/portfolio'}>All</Item>
                        </Link>
                        <Link to="/portfolio/archive" onClick={() => this.handleItemClick()}>
                            <Item active={this.state.currentGallery === '#/portfolio/archive'}>Tumblr Archive</Item>
                        </Link>
                        <Link to="/portfolio/sceneries" onClick={() => this.handleItemClick()}>
                            <Item active={this.state.currentGallery === '#/portfolio/sceneries'}>Sceneries</Item>
                        </Link>
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
                        <li>
                            <Link to="/portfolio" ref={(node) => this.link1 = node} onClick={() => this.handleItemClick()} >
                                <CollapsibleItem>All</CollapsibleItem>
                            </Link>
                        </li>
                        <li>
                            <Link to="/portfolio/archive" ref={(node) => this.link2 = node} onClick={() => this.handleItemClick()}>
                                <CollapsibleItem>Tumblr Archive</CollapsibleItem>
                            </Link>
                        </li>
                        <li>
                            <Link to="/portfolio/sceneries" ref={(node) => this.link3 = node} onClick={() => this.handleItemClick()}>
                                <CollapsibleItem>Sceneries</CollapsibleItem>
                            </Link>
                        </li>
                        <li><Link to="/contact" className="link"><CollapsibleItem>Contact Me</CollapsibleItem></Link></li>
                    </ul>
                </div>
                <Route exact path="/portfolio">
                    <Gallery array={allImages} onImageClick={this.handleImageClick} />
                </Route>
                <Route path="/portfolio/archive">
                    <Gallery array={archiveImages} onImageClick={this.handleImageClick} />
                </Route>
                <Route path="/portfolio/sceneries">
                    <Gallery array={sceneryImages} onImageClick={this.handleImageClick} />
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
