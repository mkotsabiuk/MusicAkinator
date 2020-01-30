import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './PasteText.css';

class PasteText extends Component {
    constructor(props) {
        super(props);

        this.onLyricChange = this.onLyricChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = { lyric: '', loader: false };
    }

    onLyricChange(event) {
        this.setState({ lyric: event.target.value });
    }
    onClick() {
        this.setState({ lyric: '', loader: true });
        this.props.goClick(this.state.lyric)
            .then(() => {
                this.setState({ loader: false });
            });
    }

    render() {
        const hidden = this.state.loader ? 'hidden' : '';
        return (
            <div className={this.props.hidden + " paste-text"} >
                <div className={hidden}>
                    <p>{this.props.message}</p>
                    <textarea
                        value={this.state.lyric}
                        onChange={this.onLyricChange}>
                    </textarea>
                    <button className="go-btn" onClick={this.onClick}>
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
            </div>
        );
    }
}

export default PasteText;
