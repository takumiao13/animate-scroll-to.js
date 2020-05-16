!function(root, factory) {
  if (typeof module != 'undefined') module.exports = factory();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(factory);
  else root.animateScrollTo = factory();
}(this, function() {

  // CONSTANT
  // ==
  var DEFAULTS = {
    duration: 468,
    animate: true
  };
  
  var shorthand = {
    top: function() { return 0 },
    bottom: scrollBottom
  };

  // Utils
  // ==
  function isDefined(val) {
    return val !== void 0;
  }

  function scrollTop(elem) {
    if (elem === window) {
      var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // handle top is float or not
      return top%1 != 0 ? Math.ceil(top - 1) : top;
    } else {
      return elem.scrollTop;
    }
  }

  function scrollBottom(elem) {
    if (elem === window) {
      return document.documentElement.scrollHeight - window.innerHeight;
    } else {
      return elem.scrollHeight - elem.clientHeight;
    }
  }

  function scrollTo(elem, x, y) {
    if (elem === window) {
      window.scroll(x, y);
    } else {
      elem.scrollLeft = x;
      elem.scrollTop = y;
    }
  }

  // Public
  // ==
  function scroll(target, options, callback) {
    if (arguments.length == 2 && typeof options === 'function') {
      callback = options;
    }

    options = options || {}

    var container = options.container || window,
        duration = options.duration || DEFAULTS.duration,
        speed = options.speed,
        animate = isDefined(options.animate) ? options.animate : DEFAULTS.animate;

    var paused = true,
        startTop = getStartTop(container),
        endTop = getEndTop(target, startTop, container),
        direction,
        distance;

    if (isNaN(endTop)) return;
    
    direction = endTop - startTop;

    endTop = direction > 0 ?
      Math.min(scrollBottom(container), endTop):
      Math.max(0, endTop);

    distance = endTop - startTop;

    console.log(scrollBottom(container));

    start();

    // scroller instance
    return {
      start: start,

      pause: function() {
        paused = true;
      },

      resume: function() {
        if (paused) start(getStartTop(container));
      },

      isPaused: function() {
        return paused;
      }
    }

    function start(_startTop) {
      // re-calucate distance and duration when resume
      var _startTop = _startTop || startTop,
          _distance = endTop - _startTop,
          _duration;
 
      // check distance is none or over
      if (_distance === 0 || (_distance / distance) < 0) {
        return setTimeout(callback);
      };

      _duration = (_distance / distance) * duration;
      paused = false;

      step({
        container: container,
        startTime: +new Date,
        startTop: _startTop,
        endTop: endTop,
        distance: _distance,
        duration: _duration,
        animate: animate,
        speed: speed,
        callback: callback
      });
    }

    function step(ctx) {
      if (paused) return;

      var now = +new Date,
          scrollTop,
          elapsed = now - ctx.startTime;

      // calculate the position.
      if (ctx.speed) {
        scrollTop = ctx.startTop + elapsed / 1000 * ctx.speed;
      } else {
        var ratio = elapsed / ctx.duration;
        scrollTop = ctx.startTop + (ctx.distance * ratio);
      }

      var isEnd = ctx.distance > 0 ? 
        scrollTop >= ctx.endTop :
        scrollTop <= ctx.endTop;
  
      if (isEnd || !ctx.animate) {
        paused = true; // when scroll to end, pause it
        scrollTo(ctx.container, 0, ctx.endTop)
        setTimeout(ctx.callback);
      } else {
        scrollTo(ctx.container, 0, scrollTop)
        requestAnimationFrame(function() { step(ctx) });
      }
    }
  }

  // Private
  // ==
  function getStartTop(elem) {
    return scrollTop(elem);
  }

  function getEndTop(target, startTop, container) {
    switch (typeof target) {
      case 'number':
        return target;
      case 'string':
        var match = target.match(/^(?:([+-])=)(\d+(?:\.\d+)?)$/);
        if (match) {
          var sign = {'+': 1, '-': -1}[match[1]],
              step = match[2] * sign;
          return startTop + step;
        } else if (shorthand[target]) {
          return shorthand[target](container);
        } else {
          return parseFloat(target);
        }
    }
  }

  // Exports
  // ==
  scroll.defaults = DEFAULTS;
  return scroll;
});