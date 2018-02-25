var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// VARIABLES
var magicalUnderlines = Array.from(document.querySelectorAll('.underline'));

var gradientAPI = 'https://gist.githubusercontent.com/wking-io/3e116c0e5675c8bcad8b5a6dc6ca5344/raw/4e783ce3ad0bcd98811c6531e40256b8feeb8fc8/gradient.json';

// HELPER FUNCTIONS

// 1. Get random number in range. Used to get random index from array.
var randNumInRange = function randNumInRange(max) {
  return Math.floor(Math.random() * (max - 1));
};

// 2. Merge two separate array values at the same index to 
// be the same value in new array.
var mergeArrays = function mergeArrays(arrOne, arrTwo) {
  return arrOne.map(function (item, i) {
    return item + ' ' + arrTwo[i];
  }).join(', ');
};

// 3. Curried function to add a background to array of elms
var addBackground = function addBackground(elms) {
  return function (color) {
    elms.forEach(function (el) {
      el.style.backgroundImage = color;
    });
  };
};
// 4. Function to get data from API
var getData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;
            return _context.abrupt('return', data.data);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();

// 5. Partial Application of addBackground to always apply 
// background to the magicalUnderlines constant
var addBackgroundToUnderlines = addBackground(magicalUnderlines);

// GRADIENT FUNCTIONS

// 1. Build CSS formatted linear-gradient from API data
var buildGradient = function buildGradient(obj) {
  return 'linear-gradient(' + obj.direction + ', ' + mergeArrays(obj.colors, obj.positions) + ')';
};

// 2. Get single gradient from data pulled in array and
// apply single gradient to a callback function
var applyGradient = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, callback) {
    var data, gradient;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getData(url);

          case 2:
            data = _context2.sent;
            gradient = buildGradient(data[randNumInRange(data.length)]);

            callback(gradient);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function applyGradient(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// RESULT
applyGradient(gradientAPI, addBackgroundToUnderlines);