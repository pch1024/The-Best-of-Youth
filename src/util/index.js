(() => console.log('Philip.Pei'))();

export const eListener = (el, event, callback, capture) => {
  var passiveSupported = false;
  try {
    Object.defineProperty({}, 'passive', {
      get: () => {
        passiveSupported = true;
      }
    });
  } catch (err) {}

  capture = capture || false;
  el.addEventListener(
    event,
    e => {
      callback(e);
      e.preventDefault();
      e.stopPropagation();
    },
    passiveSupported
      ? {
        passive: true
      }
      : capture
  );
};

export const DargDrop = options => {
  let startX, startY, moveX, moveY;

  let el = options.el || document;
  let num = options.num || 0;

  let isMobile = 'ontouchstart' in document;
  let isMousePress = false;
  let isMove = false;

  console.log(isMobile ? 'touch' : 'mouse');

  let TouchEvents = {
    start: isMobile ? 'touchstart' : 'mousedown',
    move: isMobile ? 'touchmove' : 'mousemove',
    end: isMobile ? 'touchend' : 'mouseup'
  };

  eListener(el, TouchEvents.start, e => {
    isMousePress = true;
    e = isMobile ? e.touches[0] : e;
    [startX, startY] = [e.clientX, e.clientY];
    options.start(startX, startY, el, num, e);
  });

  eListener(el, TouchEvents.move, e => {
    isMove = true;
    e = isMobile ? e.touches[0] : e;
    [moveX, moveY] = [e.clientX - startX, e.clientY - startY];
    if (!isMobile && isMousePress) {
      options.move(moveX, moveY, el, num, e);
    }
    if (isMobile) {
      options.move(moveX, moveY, el, num, e);
    }
  });

  let _end = () => {
    if (isMove && isMousePress) {
      // 结束，当移动状态并且鼠标点击按压状态
      isMove = false; // 重置移动状态
      isMousePress = false; // 重置鼠标点击按压状态
      options.end(moveX, moveY, el, num); // 调用end()
    }
  };

  eListener(el, TouchEvents.end, _end);

  // Mouse 兼容处理，解决当鼠标按压滑出目标元素时无法捕捉end,此时监听鼠标滑出目标元素事件leave
  if (!isMobile) {
    eListener(el, 'mouseleave', _end);
  }
};

// DeepClone
export const DeepClone = obj => {
  if (typeof obj !== 'object') return obj;
  let result =
    Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
  for (let key in obj) {
    result[key] = typeof obj[key] === 'object' ? DeepClone(obj[key]) : obj[key];
  }
  return result;
};

export const isNull = str => {
  return str === null || str === '' || str === undefined;
};

export const handlerCSS = (selector, styleName, styleValue) => {
  let tmpClass = null;
  let cssfilter = (obj, n) => {
    let tmp = {};
    while (n > 0) {
      tmp[obj[n - 1]] = obj[obj[n - 1]];
      n--;
    }
    return tmp;
  };
  let toEach = Array.prototype.forEach;
  toEach.call(document.styleSheets, j => {
    let rules = j.cssRules || j.rules;
    toEach.call(rules, i => {
      if (i.selectorText === selector) {
        if (styleName && styleValue) {
          i.style[styleName] = styleValue;
        }
        tmpClass = cssfilter(i.style, i.styleMap.size);
      }
    });
  });
  return tmpClass;
};
