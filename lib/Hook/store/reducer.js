'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
exports.__esModule = true
exports.initialState = void 0
exports.initialState = {
  timings: {},
  count: {},
}
exports['default'] = function (state, action) {
  var _a, _b, _c
  if (state === void 0) {
    state = exports.initialState
  }
  switch (action.type) {
    case 'COUNT': {
      var times = state.count[action.name] || 0
      return __assign(__assign({}, state), {
        count: __assign(
          __assign({}, state.count),
          ((_a = {}), (_a[action.name] = times + 1), _a)
        ),
      })
    }
    case 'TIME_START': {
      return __assign(__assign({}, state), {
        timings: __assign(
          __assign({}, state.timings),
          ((_b = {}),
          (_b[action.name] = {
            start: performance.now() || +new Date(),
          }),
          _b)
        ),
      })
    }
    case 'TIME_END': {
      var timing = state.timings[action.name]
      var end = performance.now() || +new Date()
      var start = timing.start
      var time = end - start
      return __assign(__assign({}, state), {
        timings: __assign(
          __assign({}, state.timings),
          ((_c = {}),
          (_c[action.name] = __assign(__assign({}, timing), {
            end: end,
            time: time,
          })),
          _c)
        ),
      })
    }
    default: {
      return state
    }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Ib29rL3N0b3JlL3JlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFYSxRQUFBLFlBQVksR0FBRztJQUMxQixPQUFPLEVBQUUsRUFBRTtJQUNYLEtBQUssRUFBRSxFQUFFO0NBQ1YsQ0FBQTtBQUVELHNCQUFlLFVBQUMsS0FBb0IsRUFBRSxNQUFjOztJQUFwQyxzQkFBQSxFQUFBLFFBQVEsb0JBQVk7SUFDbEMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ25CLEtBQUssT0FBTyxDQUFDLENBQUM7WUFDWixJQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFM0MsNkJBQ0ssS0FBSyxLQUNSLEtBQUssd0JBQ0EsS0FBSyxDQUFDLEtBQUssZ0JBQ2IsTUFBTSxDQUFDLElBQUksSUFBRyxLQUFLLEdBQUcsQ0FBQyxVQUUzQjtTQUNGO1FBRUQsS0FBSyxZQUFZLENBQUMsQ0FBQztZQUNqQiw2QkFDSyxLQUFLLEtBQ1IsT0FBTyx3QkFDRixLQUFLLENBQUMsT0FBTyxnQkFDZixNQUFNLENBQUMsSUFBSSxJQUFHO29CQUNiLEtBQUssRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtpQkFDeEMsVUFFSjtTQUNGO1FBRUQsS0FBSyxVQUFVLENBQUMsQ0FBQztZQUNmLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRXpDLElBQU0sR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUE7WUFDcEMsSUFBQSxLQUFLLEdBQUssTUFBTSxNQUFYLENBQVc7WUFFeEIsSUFBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQTtZQUV4Qiw2QkFDSyxLQUFLLEtBQ1IsT0FBTyx3QkFDRixLQUFLLENBQUMsT0FBTyxnQkFDZixNQUFNLENBQUMsSUFBSSwwQkFDUCxNQUFNLEtBQ1QsR0FBRyxLQUFBLEVBQ0gsSUFBSSxNQUFBLGFBR1Q7U0FDRjtRQUVELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsT0FBTyxLQUFLLENBQUE7U0FDYjtLQUNGO0FBQ0gsQ0FBQyxFQUFBIn0=
