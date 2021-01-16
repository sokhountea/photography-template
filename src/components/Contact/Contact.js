import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
//import axios from 'axios';

import './Contact.scss';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            sent: false,
        }
    }

    componentDidMount() {
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
    }

    handleSubmit(e) {
        // prevents the default action of the form, which would’ve caused a page reload.
        e.preventDefault();

        console.log(this.state);

        // axios({
        //     method: "POST",
        //     url: "/send",
        //     data: this.state
        // })
        //     .then(res => {
        //         this.resetForm();
        //     })
        //     .catch(() => {
        //         console.log('Message not sent')
        //     })
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: ''
        });
    }

    render() {
        return (
            <div className="Contact">
                <header className="Contact-header">
                    <FadeIn>
                        <Link to="/">Sokhountea Sy</Link>
                    </FadeIn>
                </header>
                <div className="Contact-main">
                    <div>
                        <FadeIn
                            delay={200}
                        >
                            <section>
                                <h1>About Me</h1>
                                <span></span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.</p>
                                <br></br>
                                <p>For rates, bookings and all other enquires send me an email or simply fill out the form provided below.</p>
                                <div className="porfolio-links"><Link to="/portfolio" className="link">Porfolio</Link></div>

                            </section>

                            <section>
                                <form id="Contact-form" onSubmit={(e) => this.handleSubmit(e)} method="POST">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                            type="text"
                                            className="form-control"
                                            value={this.state.name}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                            type="email"
                                            className="form-control"
                                            value={this.state.email}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            onChange={(e) => this.setState({ message: e.target.value })}
                                            className="form-control"
                                            rows="5"
                                            value={this.state.message}

                                        >
                                        </textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </form>
                            </section>
                        </FadeIn>
                    </div>
                </div>
                <footer>
                    <FadeIn
                        delay={250}
                    >
                        <div className="social-info">
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
                        </div>
                        <div className="bottom">
                            <p>Template by <a href="https://sokhountea.github.io/" target="_blank" rel="noreferrer">Sokhountea Sy</a></p>
                        </div>
                    </FadeIn>
                </footer>
            </div>
        )
    }
}

export default Contact;
