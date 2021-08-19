'use strict'
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i]
    return to
  }
exports.__esModule = true
exports.test = void 0
function test(expression) {
  var messages = []
  for (var _i = 1; _i < arguments.length; _i++) {
    messages[_i - 1] = arguments[_i]
  }
  if (expression) return false
  // Default message
  if (messages.length === 0) messages.push('console.assert')
  return {
    method: 'error',
    data: __spreadArray(['Assertion failed:'], messages),
  }
}
exports.test = test
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0hvb2svcGFyc2UvbWV0aG9kcy9hc3NlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxTQUFnQixJQUFJLENBQUMsVUFBZTtJQUFFLGtCQUFrQjtTQUFsQixVQUFrQixFQUFsQixxQkFBa0IsRUFBbEIsSUFBa0I7UUFBbEIsaUNBQWtCOztJQUN0RCxJQUFJLFVBQVU7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUU1QixrQkFBa0I7SUFDbEIsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFFMUQsT0FBTztRQUNMLE1BQU0sRUFBRSxPQUFPO1FBQ2YsSUFBSSxpQkFBRyxtQkFBbUIsR0FBSyxRQUFRLENBQUM7S0FDekMsQ0FBQTtBQUNILENBQUM7QUFWRCxvQkFVQyJ9
