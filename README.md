animate-scroll-to
=================
Simple plugin for scroll smoothly.

## Installation and use
install with npm
```bash
npm install animate-scroll-to.js
```

Common.js
```js
var animateScrollTo = require('animate-scroll-to.js');
```

or add it to your page
```html
<script src="dist/animate-scroll-to.js"></script>

<!-- or minified version -->
<script src="dist/animate-scroll-to.min.js"></script>
```

## API
```javascript
var scroller = animateScrollTo(target[, options][, callback]);
```

### target
- a number with vertical offset in px `50`.
- a string with relative step: `+=50`, `-=50`.
- a string with shorthand `top | bottom`.

### options
- `duration: Number` - duration of the animation `(default: 468)`.
- `animate: Boolean` - whether the scrolling should animate smoothly `(default: true)`.
- `speed: Number` - px per second (px/s) of animation.

**NOTE:** if `speed` specifies `duration` will be ignored.

### scroller
- `start`
- `pause`
- `resume`
- `isPaused`


## TODO
- [] autoStart
- [] change speed


## License

MIT