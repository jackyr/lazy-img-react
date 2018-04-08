import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Base from './base.jsx';
import Container from './container.jsx';

class LazyImg extends Base {
  static propTypes = {
    src: PropTypes.string,
    placeholder: PropTypes.string,
    offset: PropTypes.number,
    container: PropTypes.object,
  }
  static defaultProps = {
    src: '',
    placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2M4c+bMfwAIMANkq3cY2wAAAABJRU5ErkJggg==',
    offset: 0,
    container: null,
  }
  static Container = Container
  componentDidMount() {
    const containerComponent = this.props.container;
    if (containerComponent) {
      this.isWindowMode = false;
      containerComponent.addImage(findDOMNode(this));
      containerComponent.reinit();
    } else {
      this.images = [findDOMNode(this)];
      const container = this.findContainer(this.images[0]);
      if (!container) {
        this.container = window;
        this.isWindowMode = true;
        this.bind();
      } else {
        this.isWindowMode = false;
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      const image = findDOMNode(this);
      image.setAttribute('src', this.props.placeholder);
      if (this.isWindowMode) {
        this.addImage(image);
        this.rebind();
      } else {
        const containerComponent = this.props.container;
        if (containerComponent) {
          containerComponent.addImage(image);
          containerComponent.reinit();
        }
      }
    }
  }
  componentWillUnmount() {
    if (this.isWindowMode) {
      this.unbind();
    }
  }
  addImage(image) {
    if (this.images.indexOf(image) === -1) {
      this.images.push(image);
    }
  }
  render() {
    const { src, placeholder, offset } = this.props;
    const props = { ...this.props };
    ['key', 'container', 'src', 'placeholder', 'offset'].forEach(v => delete props[v]);
    return (<img
      {...props}
      src={placeholder}
      data-lazy-img
      data-src={src}
      data-offset={offset}
    />);
  }
}

export default LazyImg;
