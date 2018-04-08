'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_Base) {
  _inherits(Container, _Base);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
  }

  _createClass(Container, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.container = (0, _reactDom.findDOMNode)(this);
      this.images = this.getImages(this.container);
      if (this.images.length) {
        this.isWindowMode = false;
        this.bind();
      } else {
        this.isWindowMode = true;
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.isWindowMode) this.unbind();
    }
  }, {
    key: 'getImages',
    value: function getImages(container) {
      var _this2 = this;

      var images = container.querySelectorAll('img[data-lazy-img]');
      return Array.prototype.slice.call(images).filter(function (v) {
        return _this2.findContainer(v) === container;
      });
    }
  }, {
    key: 'addImage',
    value: function addImage(image) {
      if (this.images.indexOf(image) === -1) {
        this.images.push(image);
      }
    }
  }, {
    key: 'reinit',
    value: function reinit() {
      this.images = this.images.filter(function (v) {
        return document.documentElement.contains(v);
      });
      this.rebind();
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react2.default.createElement(
        'div',
        _extends({}, this.props, {
          'data-lazy-container': true
        }),
        children
      );
    }
  }]);

  return Container;
}(_base2.default);

exports.default = Container;