import React from 'react';
import dist from './wushiyin.json';

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 0
    };
    this.verify = this.verify.bind(this);
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

    // 计时开始
    this.timeStart = new Date();
  }

  verify(e) {
    if (e.key !== 'Enter') { return }
    this.timeStop = new Date();
    let time = this.timeStop - this.timeStart;
    this.time = time;
    this.setState({
      time
    });
    let answer = this.refs.inputRef;
    let getAnswer = this.refs.inputRef.value;
    if (getAnswer.length === 0) { return }
    if (getAnswer === this.state.answer) {
      this.showWord();
    }
    answer.value = '';
  }

  componentDidMount() {
    this.distKey = Object.keys(dist);
    this.showWord();
  }

  render() {
    return (
      <div>
        <div className={'show-word'} ref={'showRef'}>
          <p>{this.state.question}</p>
        </div>
        <input type={'text'} ref={'inputRef'}
          className={'show-word-answer'}
          onKeyDown={this.verify} />
        <div className={'show-word-time'}>{this.state.time}ms</div>
      </div>
    );
  }
};

export default Page;
