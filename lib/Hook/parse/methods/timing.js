'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
exports.stop = exports.start = void 0
var state_1 = require('../../store/state')
var dispatch_1 = __importDefault(require('../../store/dispatch'))
var actions_1 = require('../../store/actions')
function start(label) {
  dispatch_1['default'](actions_1.timeStart(label))
}
exports.start = start
function stop(label) {
  var timing =
    state_1.state === null || state_1.state === void 0
      ? void 0
      : state_1.state.timings[label]
  if (timing && !timing.end) {
    dispatch_1['default'](actions_1.timeEnd(label))
    var time = state_1.state.timings[label].time
    return {
      method: 'log',
      data: [label + ': ' + time + 'ms'],
    }
  }
  return {
    method: 'warn',
    data: ["Timer '" + label + "' does not exist"],
  }
}
exports.stop = stop
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0hvb2svcGFyc2UvbWV0aG9kcy90aW1pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkNBQXlDO0FBQ3pDLGtFQUEyQztBQUMzQywrQ0FBd0Q7QUFFeEQsU0FBZ0IsS0FBSyxDQUFDLEtBQWE7SUFDakMscUJBQVEsQ0FBQyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDNUIsQ0FBQztBQUZELHNCQUVDO0FBRUQsU0FBZ0IsSUFBSSxDQUFDLEtBQWE7SUFDaEMsSUFBTSxNQUFNLEdBQUcsYUFBSyxhQUFMLGFBQUssdUJBQUwsYUFBSyxDQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNwQyxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDekIscUJBQVEsQ0FBQyxpQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDaEIsSUFBQSxJQUFJLEdBQUssYUFBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBekIsQ0FBeUI7UUFFckMsT0FBTztZQUNMLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLENBQUksS0FBSyxVQUFLLElBQUksT0FBSSxDQUFDO1NBQzlCLENBQUE7S0FDRjtJQUNELE9BQU87UUFDTCxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxDQUFDLFlBQVUsS0FBSyxxQkFBa0IsQ0FBQztLQUMxQyxDQUFBO0FBQ0gsQ0FBQztBQWZELG9CQWVDIn0=
