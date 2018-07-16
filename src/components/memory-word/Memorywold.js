import React from 'react';
import dist from './wushiyin.json';
import './memory-word.css';

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 0
    };
    this.verify = this.verify.bind(this);
    this.startQuestion = this.startQuestion.bind(this);
    this.reQuestion = this.reQuestion.bind(this);
  }

  showWord() {
    let arr = this.distKey;
    if (this.time < 4000 && this.time !== 0) {
      arr.splice(this.state.index, 1);
    }
    let len = arr.length;
    let index = ~~(len * Math.random());
    let question = arr[index];
    if (arr.length === 0) {
      question = '完成 !';
    }
    let answer = dist[question];
    this.setState({
      index,
      question,
      answer
    });
  }

  verify(e) {
    if (e.key !== 'Enter') { return }
    let answer = this.refs.inputRef;
    let getAnswer = this.refs.inputRef.value;
    if (getAnswer.length === 0) { return }
    if (getAnswer === this.state.answer) {
      this.showWord();
    }
    answer.value = '';
  }

  timePass() {
    const me = this;
    let time = new Date() - this.timeStart;
    this.setState({
      time
    });
    if (this.state.question === '完成 !') { window.cancelAnimationFrame(this.timer); }
    this.timer = window.requestAnimationFrame(this.timePass.bind(me));
  }

  startQuestion() {
    if (this.startLock) { return }
    this.startLock = true;
    this.showWord();
    this.timeStart = new Date();
    this.timePass();
  }

  reQuestion() {
    this.startLock = false;
    window.cancelAnimationFrame(this.timer);
    this.componentDidMount();
    this.setState({
      time: 0,
      question: '',
      answer: ''
    });
  }

  componentDidMount() {
    this.distKey = Object.keys(dist);
  }

  render() {
    return (
      <div className={'show-word-wrap'}>
        <div className={'show-word'} ref={'showRef'}>
          <p>{this.state.question}</p>
        </div>
        <input type={'text'} ref={'inputRef'}
          className={'show-word-input-answer'}
          onKeyDown={this.verify} />
        <div className={'show-word-time'}>
          <span>用时: </span>
          <span>{this.state.time / 100}</span>
          <span> s</span>
        </div>
        <div className={'show-word-start-btn'} onClick={this.startQuestion}>开始</div>
        <div className={'show-word-re-btn'} onClick={this.reQuestion}>重置</div>
        <div className={'show-word-answer'}>
          <span>答案</span>
          <span>: {this.state.answer}</span>
        </div>
      </div>
    );
  }
};

export default Page;
