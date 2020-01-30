import React, { Component } from "react";
import Track from "../track/Track";
import './Answer.css';

class Answer extends Component {
    constructor(props) {
        super(props);

        this.onCorrectAnswer = this.onCorrectAnswer.bind(this);
        this.onIncorrectAnswer = this.onIncorrectAnswer.bind(this);
    }

    onIncorrectAnswer() {
        this.props.onIncorrectAnswer();
    }

    onCorrectAnswer() {
        this.props.onCorrectAnswer();
    }

    foundTrack() {
        const answer = (
            <div>
                <Track id={this.props.lyric.track_id} />
                <div className="check-div">
                    <p>Am I corect?</p>
                    <button className="yes-btn" onClick={this.onCorrectAnswer}>
                        YES
                        </button>
                    <button className="no-btn" onClick={this.onIncorrectAnswer}>
                        NO
                    </button>
                </div>
            </div>);
        return answer;
    }

    notFoundTrack(isLast) {
        const answer = (
            <div className="try-again-container">
                <button className="try-again-btn" onClick={this.onIncorrectAnswer}>
                    {isLast ? 'GAME OVER' : 'TRY AGAIN'}
                </button>
            </div>);
        return answer;
    }

    render() {
        let answer;
        let message;
        if (this.props.lyric) {
            answer = this.foundTrack();
            message = `You have wished a song: ${this.props.lyric?.song_name}`;
        } else {
            answer = this.notFoundTrack(this.props.isLast);
            message = "Sorry, I couldn't get your song";
        }

        return (
            <div className={this.props.hidden}>
                <div className="answer">
                    <div>
                        <p className="answer-name">
                            {message}
                        </p>
                    </div>
                    {answer}
                </div>
            </div>
        );
    }
}

export default Answer;
