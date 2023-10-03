import React, { Component } from 'react';

import FadeIn from 'react-fade-in';

class Gallery extends Component {
    render() {
        return (
            <FadeIn className="gallery">
                {
                    this.props.array.map(
                        (image, index) =>
                            <div
                                key={index}
                                className="image-wrapper"
                                onClick={() => this.props.onImageClick(image)}
                            >
                                <img
                                    key={index}
                                    className="item"
                                    src={image.default}
                                    alt="info">
                                </img>
                            </div>
                    )
                }
            </FadeIn>
        )
    }
}

export default Gallery;