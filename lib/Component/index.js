'use strict'
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        )
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
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
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k]
          },
        })
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var React = __importStar(require('react'))
var emotion_theming_1 = require('emotion-theming')
var default_1 = __importDefault(require('./theme/default'))
var elements_1 = require('./elements')
var Message_1 = __importDefault(require('./Message'))
// https://stackoverflow.com/a/48254637/4089357
var customStringify = function (v) {
  var cache = new Set()
  return JSON.stringify(v, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) {
        // Circular reference found, discard key
        return
      }
      // Store value in our set
      cache.add(value)
    }
    return value
  })
}
var Console = /** @class */ (function (_super) {
  __extends(Console, _super)
  function Console() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.theme = function () {
      return {
        variant: _this.props.variant || 'light',
        styles: __assign(
          __assign({}, default_1['default'](_this.props)),
          _this.props.styles
        ),
      }
    }
    return _this
  }
  Console.prototype.render = function () {
    var _this = this
    var _a = this.props,
      _b = _a.filter,
      filter = _b === void 0 ? [] : _b,
      _c = _a.logs,
      logs = _c === void 0 ? [] : _c,
      searchKeywords = _a.searchKeywords,
      logFilter = _a.logFilter,
      _d = _a.logGrouping,
      logGrouping = _d === void 0 ? true : _d
    if (searchKeywords) {
      var regex_1 = new RegExp(searchKeywords)
      var filterFun = logFilter
        ? logFilter
        : function (log) {
            try {
              return regex_1.test(customStringify(log))
            } catch (e) {
              return true
            }
          }
      // @ts-ignore
      logs = logs.filter(filterFun)
    }
    if (logGrouping) {
      // @ts-ignore
      logs = logs.reduce(function (acc, log) {
        var prevLog = acc[acc.length - 1]
        if (
          prevLog &&
          prevLog.amount &&
          prevLog.method === log.method &&
          prevLog.data.length === log.data.length &&
          prevLog.data.every(function (value, i) {
            return log.data[i] === value
          })
        ) {
          prevLog.amount += 1
          return acc
        }
        acc.push(__assign(__assign({}, log), { amount: 1 }))
        return acc
      }, [])
    }
    return React.createElement(
      emotion_theming_1.ThemeProvider,
      { theme: this.theme },
      React.createElement(
        elements_1.Root,
        null,
        logs.map(function (log, i) {
          // If the filter is defined and doesn't include the method
          var filtered =
            filter.length !== 0 &&
            log.method &&
            filter.indexOf(log.method) === -1
          return filtered
            ? null
            : React.createElement(Message_1['default'], {
                log: log,
                key: log.id || log.method + '-' + i,
                linkifyOptions: _this.props.linkifyOptions,
              })
        })
      )
    )
  }
  return Console
})(React.PureComponent)
exports['default'] = Console
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tcG9uZW50L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUE4QjtBQUM5QixtREFBK0M7QUFFL0MsNERBQW9DO0FBRXBDLHVDQUFpQztBQUNqQyxzREFBK0I7QUFFL0IsK0NBQStDO0FBQy9DLElBQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztJQUNqQyxJQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsVUFBVSxHQUFHLEVBQUUsS0FBSztRQUMzQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQy9DLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsd0NBQXdDO2dCQUN4QyxPQUFNO2FBQ1A7WUFDRCx5QkFBeUI7WUFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNqQjtRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFFRDtJQUFzQiwyQkFBK0I7SUFBckQ7UUFBQSxxRUFnRkM7UUEvRUMsV0FBSyxHQUFHLGNBQU0sT0FBQSxDQUFDO1lBQ2IsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU87WUFDdEMsTUFBTSx3QkFDRCxvQkFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FDbEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ3JCO1NBQ0YsQ0FBQyxFQU5ZLENBTVosQ0FBQTs7SUF5RUosQ0FBQztJQXZFQyx3QkFBTSxHQUFOO1FBQUEsaUJBc0VDO1FBckVLLElBQUEs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
