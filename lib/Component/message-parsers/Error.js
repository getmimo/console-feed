'use strict'
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
var react_1 = __importDefault(require('linkifyjs/react'))
function splitMessage(message) {
  var breakIndex = message.indexOf('\n')
  // consider that there can be line without a break
  if (breakIndex === -1) {
    return message
  }
  return message.substr(0, breakIndex)
}
function ErrorPanel(_a) {
  var error = _a.error
  /* This checks for error logTypes and shortens the message in the console by wrapping
    it a <details /> tag and putting the first line in a <summary /> tag and the other lines
    follow after that. This creates a nice collapsible error message */
  var otherErrorLines
  var firstLine = splitMessage(error)
  var msgArray = error.split('\n')
  if (msgArray.length > 1) {
    otherErrorLines = msgArray.slice(1)
  }
  if (!otherErrorLines) {
    return React.createElement(react_1['default'], null, error)
  }
  return React.createElement(
    'details',
    null,
    React.createElement(
      'summary',
      { style: { outline: 'none', cursor: 'pointer' } },
      firstLine
    ),
    React.createElement(react_1['default'], null, otherErrorLines.join('\n\r'))
  )
}
exports['default'] = ErrorPanel
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L21lc3NhZ2UtcGFyc2Vycy9FcnJvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQThCO0FBQzlCLDBEQUFxQztBQUVyQyxTQUFTLFlBQVksQ0FBQyxPQUFlO0lBQ25DLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEMsa0RBQWtEO0lBQ2xELElBQUksVUFBVSxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sT0FBTyxDQUFBO0tBQ2Y7SUFDRCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQ3RDLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxFQUE0QjtRQUExQixLQUFLLFdBQUE7SUFDekI7O3VFQUVtRTtJQUNuRSxJQUFJLGVBQWUsQ0FBQTtJQUNuQixJQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckMsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNsQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLGVBQWUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3BDO0lBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNwQixPQUFPLG9CQUFDLGtCQUFPLFFBQUUsS0FBSyxDQUFXLENBQUE7S0FDbEM7SUFFRCxPQUFPLENBQ0w7UUFDRSxpQ0FBUyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFDbkQsU0FBUyxDQUNGO1FBQ1Ysb0JBQUMsa0JBQU8sUUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFXLENBQ3pDLENBQ1gsQ0FBQTtBQUNILENBQUM7QUFFRCxxQkFBZSxVQUFVLENBQUEifQ==
