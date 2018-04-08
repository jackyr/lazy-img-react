import React from 'react';
import throttle from 'lodash.throttle';

/**
 * @param { element } this.container container dom
 * @param { Array<element> } this.images collection of image dom
 */
export default class Base extends React.Component {
  constructor(props) {
    super(props);
    this.scrollHandler = throttle(this.scrollHandler, 200);
  }
  findContainer(node) {
    function getParent(elm) {
      if (!elm || elm.nodeType === 9) return null;
      if (elm.getAttribute('data-lazy-container')) return elm;
      return getParent(elm.parentNode);
    }
    return getParent(node);
  }
  rebind() {
    this.unbind();
    this.bind();
  }
  bind() {
    if (window.IntersectionObserver) {
      this.observe();
    } else {
      this.container.addEventListener('scroll', this.scrollHandler);
      if (this.container === window) this.container.addEventListener('resize', this.scrollHandler);
      this.scrollHandler();
    }
  }
  unbind() {
    if (window.IntersectionObserver) {
      this.unobserve();
    } else {
      this.container.removeEventListener('scroll', this.scrollHandler);
      if (this.container === window) this.container.removeEventListener('resize', this.scrollHandler);
    }
  }
  scrollHandler = () => {
    let containerRect;
    if (this.container === window) {
      containerRect = {
        top: 0,
        height: document.documentElement.clientHeight,
        bottom: document.documentElement.clientHeight,
      };
    } else {
      containerRect = this.container.getBoundingClientRect();
    }
    this.images.forEach(img => {
      const imgRect = img.getBoundingClientRect();
      const offset = img.getAttribute('data-offset') - 0 || 0;
      if (imgRect.top - containerRect.top < containerRect.height + offset && containerRect.bottom - imgRect.bottom < containerRect.height + offset) {
        img.src = img.getAttribute('data-src');
        this.images = this.images.filter(v => v !== img);
      }
    });
    if (!this.images.length) this.unbind();
  }
  observe = () => {
    const offset = this.images[0].getAttribute('data-offset') - 0 || 0;
    this.io = new IntersectionObserver(items => {
      items.forEach(elm => {
        if (elm.intersectionRatio > 0) {
          elm.target.src = elm.target.getAttribute('data-src');
          this.images = this.images.filter(v => v !== elm.target);
          this.io.unobserve(elm.target);
        }
      });
    }, {
      threshold: [0.000001],
      root: this.container === window ? null : this.container,
      rootMargin: `${offset}px 0px`,
    });
    this.images.forEach(img => {
      this.io.observe(img);
    });
  }
  unobserve = () => {
    if (this.io) this.io.disconnect();
  }
}
