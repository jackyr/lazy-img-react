import React, { Component } from 'react';
import LazyImg from '../src/index.jsx';
import './App.css';

const LazyContainer = LazyImg.Container;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images1: this.generateImage(50),
      images2: this.generateImage(200),
    };
  }
  generateImage(num) {
    return Array(num).join(',').split(',').map(() => {
      return `https://raw.githubusercontent.com/jackyr/lazy-img-react/master/example/images/${Math.floor(Math.random() * 10) + 1}.jpg?r=${Math.random()}`;
    });
  }
  render() {
    return (
      <div className="App">
        <div className="demo1">
          <h3>
            simple usage:
            <a onClick={() => this.setState({images1: this.generateImage(50)})} href="javascript:void(0)">regenerate</a>
          </h3>
          {this.state.images1.map((v, i) => {
            return <LazyImg key={i} width="200" height="200" src={v} />;
          })}
        </div>
        
        <div className="demo2">
          <h3>
            region scroll:
            <a onClick={() => this.setState({images2: this.generateImage(200)})} href="javascript:void(0)">regenerate</a>
          </h3>
          <LazyContainer ref={el => this.container = el} className="container">
            {this.state.images2.map((v, i) => {
              return <LazyImg key={i} container={this.container} offset={50} src={v} />;
            })}
          </LazyContainer>
        </div>
      </div>
    );
  }
}

export default App;
