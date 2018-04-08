'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LazyImg = function (_Base) {
  _inherits(LazyImg, _Base);

  function LazyImg() {
    _classCallCheck(this, LazyImg);

    return _possibleConstructorReturn(this, (LazyImg.__proto__ || Object.getPrototypeOf(LazyImg)).apply(this, arguments));
  }

  _createClass(LazyImg, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var containerComponent = this.props.container;
      if (containerComponent) {
        this.isWindowMode = false;
        containerComponent.addImage((0, _reactDom.findDOMNode)(this));
        containerComponent.reinit();
      } else {
        this.images = [(0, _reactDom.findDOMNode)(this)];
        var container = this.findContainer(this.images[0]);
        if (!container) {
          this.container = window;
          this.isWindowMode = true;
          this.bind();
        } else {
          this.isWindowMode = false;
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.src !== prevProps.src) {
        var image = (0, _reactDom.findDOMNode)(this);
        image.setAttribute('src', this.props.placeholder);
        if (this.isWindowMode) {
          this.addImage(image);
          this.rebind();
        } else {
          var containerComponent = this.props.container;
          if (containerComponent) {
            containerComponent.addImage(image);
            containerComponent.reinit();
          }
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.isWindowMode) {
        this.unbind();
      }
    }
  }, {
    key: 'addImage',
    value: function addImage(image) {
      if (this.images.indexOf(image) === -1) {
        this.images.push(image);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          src = _props.src,
          placeholder = _props.placeholder,
          offset = _props.offset;

      var props = _extends({}, this.props);
      ['key', 'container', 'src', 'placeholder', 'offset'].forEach(function (v) {
        return delete props[v];
      });
      return _react2.default.createElement('img', _extends({}, props, {
        src: placeholder,
        'data-lazy-img': true,
        'data-src': src,
        'data-offset': offset
      }));
    }
  }]);

  return LazyImg;
}(_base2.default);

LazyImg.propTypes = {
  src: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  offset: _propTypes2.default.number,
  container: _propTypes2.default.object
};
LazyImg.defaultProps = {
  src: '',
  placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2M4c+bMfwAIMANkq3cY2wAAAABJRU5ErkJggg==',
  offset: 0,
  container: null
};
LazyImg.Container = _container2.default;
exports.default = LazyImg;