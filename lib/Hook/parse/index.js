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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i]
    return to
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
var GUID_1 = __importDefault(require('./GUID'))
var Timing = __importStar(require('./methods/timing'))
var Count = __importStar(require('./methods/count'))
var Assert = __importStar(require('./methods/assert'))
/**
 * Parses a console log and converts it to a special Log object
 * @argument method The console method to parse
 * @argument data The arguments passed to the console method
 */
function Parse(method, data, staticID) {
  // Create an ID
  var id = staticID || GUID_1['default']()
  // Parse the methods
  switch (method) {
    case 'clear': {
      return {
        method: method,
        id: id,
      }
    }
    case 'count': {
      var label = typeof data[0] === 'string' ? data[0] : 'default'
      if (!label) return false
      return __assign(__assign({}, Count.increment(label)), { id: id })
    }
    case 'time':
    case 'timeEnd': {
      var label = typeof data[0] === 'string' ? data[0] : 'default'
      if (!label) return false
      if (method === 'time') {
        Timing.start(label)
        return false
      }
      return __assign(__assign({}, Timing.stop(label)), { id: id })
    }
    case 'assert': {
      var valid = data.length !== 0
      if (valid) {
        var assertion = Assert.test.apply(
          Assert,
          __spreadArray([data[0]], data.slice(1))
        )
        if (assertion) {
          return __assign(__assign({}, assertion), { id: id })
        }
      }
      return false
    }
    case 'error': {
      var errors = data.map(function (error) {
        try {
          return error.stack || error
        } catch (e) {
          return error
        }
      })
      return {
        method: method,
        id: id,
        data: errors,
      }
    }
    default: {
      return {
        method: method,
        id: id,
        data: data,
      }
    }
  }
}
exports['default'] = Parse
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvSG9vay9wYXJzZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsZ0RBQXlCO0FBRXpCLHVEQUEwQztBQUMxQyxxREFBd0M7QUFDeEMsdURBQTBDO0FBRTFDOzs7O0dBSUc7QUFDSCxTQUFTLEtBQUssQ0FDWixNQUFlLEVBQ2YsSUFBVyxFQUNYLFFBQWlCO0lBRWpCLGVBQWU7SUFDZixJQUFNLEVBQUUsR0FBRyxRQUFRLElBQUksaUJBQUksRUFBRSxDQUFBO0lBRTdCLG9CQUFvQjtJQUNwQixRQUFRLE1BQU0sRUFBRTtRQUNkLEtBQUssT0FBTyxDQUFDLENBQUM7WUFDWixPQUFPO2dCQUNMLE1BQU0sUUFBQTtnQkFDTixFQUFFLElBQUE7YUFDSCxDQUFBO1NBQ0Y7UUFFRCxLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ1osSUFBTSxLQUFLLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtZQUMvRCxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQTtZQUV4Qiw2QkFDSyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUN6QixFQUFFLElBQUEsSUFDSDtTQUNGO1FBRUQsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLFNBQVMsQ0FBQyxDQUFDO1lBQ2QsSUFBTSxLQUFLLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtZQUMvRCxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQTtZQUV4QixJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ25CLE9BQU8sS0FBSyxDQUFBO2FBQ2I7WUFFRCw2QkFDSyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUNyQixFQUFFLElBQUEsSUFDSDtTQUNGO1FBRUQsS0FBSyxRQUFRLENBQUMsQ0FBQztZQUNiLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFBO1lBRS9CLElBQUksS0FBSyxFQUFFO2dCQUNULElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLE9BQVgsTUFBTSxpQkFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFBO2dCQUN4RCxJQUFJLFNBQVMsRUFBRTtvQkFDYiw2QkFDSyxTQUFTLEtBQ1osRUFBRSxJQUFBLElBQ0g7aUJBQ0Y7YUFDRjtZQUVELE9BQU8sS0FBSyxDQUFBO1NBQ2I7UUFFRCxLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ1osSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7Z0JBQzNCLElBQUk7b0JBQ0YsT0FBTyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQTtpQkFDNUI7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxLQUFLLENBQUE7aUJBQ2I7WUFDSCxDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU87Z0JBQ0wsTUFBTSxRQUFBO2dCQUNOLEVBQUUsSUFBQTtnQkFDRixJQUFJLEVBQUUsTUFBTTthQUNiLENBQUE7U0FDRjtRQUVELE9BQU8sQ0FBQyxDQUFDO1lBQ1AsT0FBTztnQkFDTCxNQUFNLFFBQUE7Z0JBQ04sRUFBRSxJQUFBO2dCQUNGLElBQUksTUFBQTthQUNMLENBQUE7U0FDRjtLQUNGO0FBQ0gsQ0FBQztBQUVELHFCQUFlLEtBQUssQ0FBQSJ9
