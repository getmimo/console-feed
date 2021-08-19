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
var elements_1 = require('./elements')
var Formatted_1 = __importDefault(require('./message-parsers/Formatted'))
var Object_1 = __importDefault(require('./message-parsers/Object'))
var Error_1 = __importDefault(require('./message-parsers/Error'))
// https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions
var reSubstitutions = /(%[coOs])|(%(([0-9]*[.])?[0-9]+)?[dif])/g
var ConsoleMessage = /** @class */ (function (_super) {
  __extends(ConsoleMessage, _super)
  function ConsoleMessage() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.theme = function (theme) {
      return __assign(__assign({}, theme), { method: _this.props.log.method })
    }
    return _this
  }
  ConsoleMessage.prototype.shouldComponentUpdate = function (nextProps) {
    return this.props.log.amount !== nextProps.log.amount
  }
  ConsoleMessage.prototype.render = function () {
    var log = this.props.log
    return React.createElement(
      emotion_theming_1.ThemeProvider,
      { theme: this.theme },
      React.createElement(
        elements_1.Message,
        { 'data-method': log.method },
        log.amount > 1
          ? React.createElement(elements_1.AmountIcon, null, log.amount)
          : React.createElement(elements_1.Icon, null),
        React.createElement(elements_1.Content, null, this.getNode())
      )
    )
  }
  ConsoleMessage.prototype.getNode = function () {
    var _a
    var log = this.props.log
    // Error handling
    var error = this.typeCheck(log)
    if (error) return error
    // Chrome formatting
    if (log.data.length > 0 && typeof log.data[0] === 'string') {
      var matchLength =
        (_a = log.data[0].match(reSubstitutions)) === null || _a === void 0
          ? void 0
          : _a.length
      if (matchLength) {
        var restData = log.data.slice(1 + matchLength)
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(Formatted_1['default'], { data: log.data }),
          restData.length > 0 &&
            React.createElement(Object_1['default'], {
              quoted: false,
              log: __assign(__assign({}, log), { data: restData }),
              linkifyOptions: this.props.linkifyOptions,
            })
        )
      }
    }
    // Error panel
    if (
      log.data.every(function (message) {
        return typeof message === 'string'
      }) &&
      log.method === 'error'
    ) {
      return React.createElement(Error_1['default'], {
        error: log.data.join(' '),
      })
    }
    // Normal inspector
    var quoted = typeof log.data[0] !== 'string'
    return React.createElement(Object_1['default'], {
      log: log,
      quoted: quoted,
      linkifyOptions: this.props.linkifyOptions,
    })
  }
  ConsoleMessage.prototype.typeCheck = function (log) {
    if (!log) {
      return React.createElement(Formatted_1['default'], {
        data: [
          '%c[console-feed] %cFailed to parse message! %clog was typeof ' +
            typeof log +
            ", but it should've been a log object",
          'color: red',
          'color: orange',
          'color: cyan',
        ],
      })
    } else if (!(log.data instanceof Array)) {
      return React.createElement(Formatted_1['default'], {
        data: [
          '%c[console-feed] %cFailed to parse message! %clog.data was not an array!',
          'color: red',
          'color: orange',
          'color: cyan',
        ],
      })
    }
    return false
  }
  return ConsoleMessage
})(React.Component)
exports['default'] = ConsoleMessage
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21wb25lbnQvTWVzc2FnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBOEI7QUFFOUIsbURBQStDO0FBRS9DLHVDQUErRDtBQUUvRCwwRUFBbUQ7QUFDbkQsb0VBQWlEO0FBQ2pELGtFQUFnRDtBQUVoRCxzRkFBc0Y7QUFDdEYsSUFBTSxlQUFlLEdBQUcsMENBQTBDLENBQUE7QUFFbEU7SUFBNkIsa0NBQWtDO0lBQS9EO1FBQUEscUVBOEZDO1FBekZDLFdBQUssR0FBRyxVQUFDLEtBQVksSUFBSyxPQUFBLHVCQUNyQixLQUFLLEtBQ1IsTUFBTSxFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFDN0IsRUFId0IsQ0FHeEIsQ0FBQTs7SUFzRkosQ0FBQztJQTdGQyw4Q0FBcUIsR0FBckIsVUFBc0IsU0FBUztRQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQTtJQUN2RCxDQUFDO0lBT0QsK0JBQU0sR0FBTjtRQUNVLElBQUEsR0FBRyxHQUFLLElBQUksQ0FBQyxLQUFLLElBQWYsQ0FBZTtRQUMxQixPQUFPLENBQ0wsb0JBQUMsK0JBQWEsSUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDOUIsb0JBQUMsa0JBQU8sbUJBQWMsR0FBRyxDQUFDLE1BQU07Z0JBQzdCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBQyxxQkFBVSxRQUFFLEdBQUcsQ0FBQyxNQUFNLENBQWMsQ0FBQyxDQUFDLENBQUMsb0JBQUMsZUFBSSxPQUFHO2dCQUNsRSxvQkFBQyxrQkFBTyxRQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBVyxDQUMzQixDQUNJLENBQ2pCLENBQUE7SUFDSCxDQUFDO0lBRUQsZ0NBQU8sR0FBUDs7UUFDVSxJQUFBLEdBQUcsR0FBSyxJQUFJLENBQUMsS0FBSyxJQUFmLENBQWU7UUFFMUIsaUJBQWlCO1FBQ2pCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakMsSUFBSSxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUE7UUFFdkIsb0JBQW9CO1FBQ3BCLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDMUQsSUFBTSxXQUFXLEdBQUcsTUFBQSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsMENBQUUsTUFBTSxDQUFBO1lBQzlELElBQUksV0FBVyxFQUFFO2dCQUNmLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQTtnQkFDaEQsT0FBTyxDQUNMO29CQUNFLG9CQUFDLHNCQUFTLElBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUk7b0JBQzVCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQ3RCLG9CQUFDLG1CQUFVLElBQ1QsTUFBTSxFQUFFLEtBQUssRUFDYixHQUFHLHdCQUFPLEdBQUcsS0FBRSxJQUFJLEVBQUUsUUFBUSxLQUM3QixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQ3pDLENBQ0gsQ0FDQSxDQUNKLENBQUE7YUFDRjtTQUNGO1FBRUQsY0FBYztRQUNkLElBQ0UsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQTNCLENBQTJCLENBQUM7WUFDeEQsR0FBRyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQ3RCO1lBQ0EsT0FBTyxvQkFBQyxrQkFBVSxJQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSSxDQUFBO1NBQ2pEO1FBRUQsbUJBQW1CO1FBQ25CLElBQU0sTUFBTSxHQUFHLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLENBQUE7UUFDOUMsT0FBTyxDQUNMLG9CQUFDLG1CQUFVLElBQ1QsR0FBRyxFQUFFLEdBQUcsRUFDUixNQUFNLEVBQUUsTUFBTSxFQUNkLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FDekMsQ0FDSCxDQUFBO0lBQ0gsQ0FBQztJQUVELGtDQUFTLEdBQVQsVUFBVSxHQUFRO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPLENBQ0wsb0JBQUMsc0JBQVMsSUFDUixJQUFJLEVBQUU7b0JBQ0osa0VBQWdFLE9BQU8sR0FBRyx5Q0FBc0M7b0JBQ2hILFlBQVk7b0JBQ1osZUFBZTtvQkFDZixhQUFhO2lCQUNkLEdBQ0QsQ0FDSCxDQUFBO1NBQ0Y7YUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLEtBQUssQ0FBQyxFQUFFO1lBQ3ZDLE9BQU8sQ0FDTCxvQkFBQyxzQkFBUyxJQUNSLElBQUksRUFBRTtvQkFDSiwwRUFBMEU7b0JBQzFFLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixhQUFhO2lCQUNkLEdBQ0QsQ0FDSCxDQUFBO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQTtJQUNkLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUE5RkQsQ0FBNkIsS0FBSyxDQUFDLFNBQVMsR0E4RjNDO0FBRUQscUJBQWUsY0FBYyxDQUFBIn0=
