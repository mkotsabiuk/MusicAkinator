import React, { Component } from 'react';
import './PasteText.css';

class PasteText extends Component {
    constructor(props) {
        super(props);

        this.onLyricChange = this.onLyricChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = { lyric: '' };
    }

    onLyricChange(event) {
        this.setState({ lyric: event.target.value });
    }
    onClick() {
        this.setState({ lyric: '' });
        this.props.goClick(this.state.lyric);
    }

    render() {
        return (
            <div className={this.props.hidden + " paste-text"}>
                <div>
                    <p>{this.props.message}</p>
                    <textarea
                        value={this.state.lyric}
                        onChange={this.onLyricChange}>
                    </textarea>
                </div>
                <button className="go-btn" onClick={this.onClick}>
                    Go
                </button>
            </div>
        );
    }
}

export default PasteText;
