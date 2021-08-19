'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var html_1 = __importDefault(require('linkifyjs/html'))
var format_message_1 = __importDefault(require('./format-message'))
/**
 * Formats a console log message using the Devtools parser and returns HTML
 * @param args The arguments passed to the console method
 */
function formatMessage(args) {
  var formattedResult = document.createElement('span')
  format_message_1['default'](args[0], args.slice(1), formattedResult)
  return html_1['default'](
    formattedResult.outerHTML.replace(/(?:\r\n|\r|\n)/g, '<br />')
  )
}
exports['default'] = formatMessage
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L2RldnRvb2xzLXBhcnNlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFvQztBQUNwQyxvRUFBa0Q7QUFFbEQ7OztHQUdHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBVztJQUNoQyxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRXRELDJCQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRTVELE9BQU8saUJBQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO0FBQ2hGLENBQUM7QUFFRCxxQkFBZSxhQUFhLENBQUEifQ==
