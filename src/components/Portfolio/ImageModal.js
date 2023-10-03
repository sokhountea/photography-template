import React, { Component } from 'react';

// Libraries
import Modal from "@mui/material/Modal";
import { Zoom } from "@vx/zoom";
import { localPoint } from "@vx/event";
import { RectClipPath } from "@vx/clip-path";
import FeatherIcon from "feather-icons-react";

// Styles
import './ImageModal.scss';


class ImageModal extends Component {
    constructor(props) {
        super(props);
        this.updateImageModalDimensions = this.updateImageModalDimensions.bind(this);
        this.state = {
            width: 0,
            height: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateImageModalDimensions);
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.selectedImage.src !== this.props.selectedImage.src) {
            this.updateImageModalDimensions();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateImageModalDimensions);
    }

    updateImageModalDimensions() {
        const dims = this.props.selectedImage.dims;
        let newWidth;
        let newHeight;
        if (window.innerWidth > window.innerHeight) {
            if (dims.width > dims.height) {
                newWidth = window.innerWidth - 200;
                newHeight = (window.innerWidth - 200) * dims.height / dims.width;
            } else {
                newHeight = window.innerHeight - 200;
                newWidth = (window.innerHeight - 200) * dims.width / dims.height
            }
        } else {
            if (dims.width > dims.height) {
                newHeight = window.innerHeight - 200;
                newWidth = (window.innerHeight - 200) * dims.width / dims.height
            } else {
                newWidth = window.innerWidth - 200;
                newHeight = (window.innerWidth - 200) * dims.height / dims.width;
            }
        }
        this.setState({
            width: newWidth,
            height: newHeight
        });
    }

    render() {

        return (
            <Modal
                open={this.props.show}
                onClose={() => this.props.handleImageModalClose()}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div className="imageModal__container">
                    <div className="closeButton__container">
                        <FeatherIcon
                            width={30}
                            height={30}
                            icon={"x"}
                            color={"#ababab"}
                            className="closeButton"
                            onClick={() => this.props.handleImageModalClose()}
                        />
                    </div>
                    <div className="imageModal__body">
                        {this.state.height !== 0 && this.state.width !== 0 &&
                            <Zoom
                                width={this.state.width}
                                height={this.state.height}
                                scaleXMin={1}
                                scaleXMax={4}
                                scaleYMin={1}
                                scaleYMax={4}
                                transformMatrix={{
                                    scaleX: 1,
                                    scaleY: 1,
                                    translateX: 0,
                                    translateY: 0,
                                    skewX: 0,
                                    skewY: 0
                                }}
                            >
                                {(zoom) => {
                                    return (
                                        <div>
                                            <svg
                                                width={this.state.width}
                                                height={this.state.height}
                                                style={{
                                                    cursor: zoom.isDragging ? "grabbing" : "grab",
                                                }}
                                            >
                                                <RectClipPath
                                                    id="zoom-clip"
                                                    width={this.state.width}
                                                    height={this.state.height}
                                                />
                                                <rect
                                                    width={this.state.width}
                                                    height={this.state.height}
                                                    fill="white"
                                                />
                                                <g transform={zoom.toString()}>
                                                    <image height={this.state.height} width={this.state.width} href={this.props.selectedImage.src} />
                                                </g>
                                                <rect
                                                    width={this.state.width}
                                                    height={this.state.height}
                                                    fill="transparent"
                                                    onWheel={zoom.handleWheel}
                                                    onMouseDown={zoom.dragStart}
                                                    onMouseMove={zoom.dragMove}
                                                    onMouseUp={zoom.dragEnd}
                                                    onMouseLeave={() => {
                                                        if (!zoom.isDragging) return;
                                                        zoom.dragEnd();
                                                    }}
                                                    onDoubleClick={(event) => {
                                                        const point = localPoint(event);
                                                        zoom.scale({
                                                            scaleX: 1.5,
                                                            scaleY: 1.5,
                                                            point,
                                                        });
                                                    }}
                                                />
                                            </svg>
                                        </div>
                                    );
                                }}
                            </Zoom>
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ImageModal;