import React, { Component } from "react";
import "./AudioRecorder.css";
import AudioAnalyser from "react-audio-analyser"
import Loader from 'react-loader-spinner'


export default class AudioRecorder extends Component {
    constructor(props) {

        super(props)
        this.onClick = this.onClick.bind(this);
        this.state = {
            status: null,
            blob: null,
            loader: false,
            goBtn: "go-btn hidden"
        }
    }

    controlAudio(status) {
        this.setState({
            status
        })
    }

    onClick() {
        this.setState({ lyric: '', loader: true });
        this.props.goClick(this.state.blob)
            .then(() => {
                this.setState({ loader: false });
            });
    }

    render() {
        const { status, audioSrc } = this.state;
        const audioProps = {
            audioType: "audio/mp3",
            status,
            audioSrc,
            startCallback: (e) => {
                console.log("succ start", e);
                this.setState({
                    goBtn: "go-btn hidden"
                });
            },
            pauseCallback: (e) => {
                console.log("succ pause", e);
            },
            stopCallback: (e) => {
                this.setState({
                    audioSrc: window.URL.createObjectURL(e),
                    blob: e,
                    goBtn: "go-btn"
                })
                console.log("succ stop", e)
            }
        }
        const hidden = this.state.loader ? 'hidden' : '';

        return (
            <div className={this.props.hidden + " paste-text"}>
                <div className={hidden}>
                    <AudioAnalyser {...audioProps}>
                        <div className="btn-box">
                            {status !== "recording" &&
                                <i className="iconfont icon-start" title="Start"
                                    onClick={() => this.controlAudio("recording")}></i>}
                            {status === "recording" &&
                                <i className="iconfont icon-pause" title="Pause"
                                    onClick={() => this.controlAudio("paused")}></i>}
                            <i className="iconfont icon-stop" title="Stop"
                                onClick={() => this.controlAudio("inactive")}></i>
                        </div>
                    </AudioAnalyser>
                    <button className={this.state.goBtn} onClick={this.onClick}>
                        Go
                        </button>
                </div>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={0}
                    visible={this.state.loader}
                />
            </ div>
        );
    }
}
