import React from 'react';
import { findDOMNode } from 'react-dom';
import debounce from 'lodash.debounce';
import Base from './base';

class Container extends Base {
  constructor(props) {
    super(props);
    this.reinit = debounce(this.reinit, 0);
  }
  componentDidMount() {
    this.container = findDOMNode(this);
    this.images = this.getImages(this.container);
    if (this.images.length) {
      this.isWindowMode = false;
      this.bind();
    } else {
      this.isWindowMode = true;
    }
  }
  componentWillUnmount() {
    if (!this.isWindowMode) this.unbind();
  }
  getImages(container) {
    let images = container.querySelectorAll('img[data-lazy-img]');
    return Array.prototype.slice.call(images).filter(v => {
      return this.findContainer(v) === container;
    });
  }
  addImage(image) {
    if (this.images.indexOf(image) === -1) {
      this.images.push(image);
    }
  }
  reinit() {
    this.images = this.images.filter(v => {
      return document.documentElement.contains(v);
    });
    this.rebind();
  }
  render() {
    const { children } = this.props;
    return (<div
      {...this.props}
      data-lazy-container
    >
      {children}
    </div>);
  }
}

export default Container;
