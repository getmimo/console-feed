'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
exports.increment = void 0
var state_1 = require('../../store/state')
var dispatch_1 = __importDefault(require('../../store/dispatch'))
var actions_1 = require('../../store/actions')
function increment(label) {
  dispatch_1['default'](actions_1.count(label))
  var times = state_1.state.count[label]
  return {
    method: 'log',
    data: [label + ': ' + times],
  }
}
exports.increment = increment
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvSG9vay9wYXJzZS9tZXRob2RzL2NvdW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJDQUF5QztBQUN6QyxrRUFBMkM7QUFDM0MsK0NBQTJDO0FBRTNDLFNBQWdCLFNBQVMsQ0FBQyxLQUFhO0lBQ3JDLHFCQUFRLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDdEIsSUFBTSxLQUFLLEdBQUcsYUFBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoQyxPQUFPO1FBQ0wsTUFBTSxFQUFFLEtBQUs7UUFDYixJQUFJLEVBQUUsQ0FBSSxLQUFLLFVBQUssS0FBTyxDQUFDO0tBQzdCLENBQUE7QUFDSCxDQUFDO0FBUkQsOEJBUUMifQ==
