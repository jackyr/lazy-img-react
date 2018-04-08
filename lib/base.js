'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @param { element } this.container 容器dom
 * @param { Array<element> } this.images 图片dom集合
 */
var Base = function (_React$Component) {
  _inherits(Base, _React$Component);

  function Base(props) {
    _classCallCheck(this, Base);

    var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this, props));

    _this.scrollHandler = function () {
      var containerRect = void 0;
      if (_this.container === window) {
        containerRect = {
          top: 0,
          height: document.documentElement.clientHeight,
          bottom: document.documentElement.clientHeight
        };
      } else {
        containerRect = _this.container.getBoundingClientRect();
      }
      _this.images.forEach(function (img) {
        var imgRect = img.getBoundingClientRect();
        var offset = img.getAttribute('data-offset') - 0 || 0;
        if (imgRect.top - containerRect.top < containerRect.height + offset && containerRect.bottom - imgRect.bottom < containerRect.height + offset) {
          img.src = img.getAttribute('data-src');
          _this.images = _this.images.filter(function (v) {
            return v !== img;
          });
        }
      });
      if (!_this.images.length) _this.unbind();
    };

    _this.observe = function () {
      var offset = _this.images[0].getAttribute('data-offset') - 0 || 0;
      _this.io = new IntersectionObserver(function (items) {
        items.forEach(function (elm) {
          if (elm.intersectionRatio > 0) {
            elm.target.src = elm.target.getAttribute('data-src');
            _this.images = _this.images.filter(function (v) {
              return v !== elm.target;
            });
            _this.io.unobserve(elm.target);
          }
        });
      }, {
        threshold: [0.000001],
        root: _this.container === window ? null : _this.container,
        rootMargin: offset + 'px 0px'
      });
      _this.images.forEach(function (img) {
        _this.io.observe(img);
      });
    };

    _this.unobserve = function () {
      if (_this.io) _this.io.disconnect();
    };

    _this.scrollHandler = (0, _lodash2.default)(_this.scrollHandler, 200);
    return _this;
  }

  _createClass(Base, [{
    key: 'findContainer',
    value: function findContainer(node) {
      function getParent(elm) {
        if (!elm || elm.nodeType === 9) return null;
        if (elm.getAttribute('data-lazy-container')) return elm;
        return getParent(elm.parentNode);
      }
      return getParent(node);
    }
  }, {
    key: 'rebind',
    value: function rebind() {
      this.unbind();
      this.bind();
    }
  }, {
    key: 'bind',
    value: function bind() {
      if (window.IntersectionObserver) {
        this.observe();
      } else {
        this.container.addEventListener('scroll', this.scrollHandler);
        if (this.container === window) this.container.addEventListener('resize', this.scrollHandler);
        this.scrollHandler();
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      if (window.IntersectionObserver) {
        this.unobserve();
      } else {
        this.container.removeEventListener('scroll', this.scrollHandler);
        if (this.container === window) this.container.removeEventListener('resize', this.scrollHandler);
      }
    }
  }]);

  return Base;
}(_react2.default.Component);

exports.default = Base;