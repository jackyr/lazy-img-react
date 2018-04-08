# lazy-img-react [![npm](https://img.shields.io/npm/v/lazy-img-react.svg?style=flat-square)](https://www.npmjs.com/package/lazy-img-react)
Simple, efficient and easy-to-use lazy load image react component. (supports region scroll)

简单、高效、易用的图片懒加载react组件。（支持区域滚动懒加载）

## [Demo](https://jackyr.github.io/lazy-img-react/site/)

## Browser compatibility
Supports IE9+ / Android4.4+ / etc. ES5 enviroment.

支持PC/移动设备所有兼容ES5环境的浏览器。

## Installation
You can install lazy-img-react from npm.

你可以从npm安装lazy-img-react组件。

```sh
npm install lazy-img-react --save
```

## Usage
Import lazy-img-react.

引入lazy-img-react组件。

```js
import LazyImg from 'lazy-img-react';
```

Just use it like a normal img tag.

像普通的img标签一样使用即可。

```html 
<LazyImg width="200" height="200" alt="xxx" src="../image.jpg" />
```

Wrap with LazyImg.Container in the region scroll mode. And associate with ref of the container component.

区域滚动时需使用LazyImg.Container容器组件包裹，并与容器组件ref关联。

```js
const LazyContainer = LazyImg.Container;
```
```html 
<LazyContainer ref={el => this.container = el}>
  <LazyImg src="../image1.jpg" container={this.container} />
  <LazyImg src="../image2.jpg" container={this.container} />
  ...
</LazyContainer>
```

## Options
#### `src`: PropTypes.string
Image src. default: ''

图片路径。默认为：''

#### `placeholder`: PropTypes.string
The placeholder image src. It will show before the image loads or scrolls into view. default: A block with 'background:#cccccc'

图片加载前的占位图路径。默认为：以#cccccc为底色的区块

#### `offset`: PropTypes.number
Lazy load leads offset. default: 0

加载偏移提前量。默认为：0

#### `container`: PropTypes.object
Reference of the container. Don't forget this param when in region scroll mode. default: null

区域滚动时图片所属的容器ref引用。默认为：null


## testing
```sh
git clone git@github.com:jackyr/lazy-img-react.git
cd lazy-img-react
npm install
npm start
```

## License
MIT