'use strict'
exports.__esModule = true
/**
 * Serialize a function into JSON
 */
exports['default'] = {
  type: 'Function',
  shouldTransform: function (type, obj) {
    return typeof obj === 'function'
  },
  toSerializable: function (func) {
    var body = ''
    try {
      body = func
        .toString()
        .substring(body.indexOf('{') + 1, body.lastIndexOf('}'))
    } catch (e) {}
    return {
      name: func.name,
      body: body,
      proto: Object.getPrototypeOf(func).constructor.name,
    }
  },
  fromSerializable: function (data) {
    try {
      var tempFunc = function () {}
      if (typeof data.name === 'string') {
        Object.defineProperty(tempFunc, 'name', {
          value: data.name,
          writable: false,
        })
      }
      if (typeof data.body === 'string') {
        Object.defineProperty(tempFunc, 'body', {
          value: data.body,
          writable: false,
        })
      }
      if (typeof data.proto === 'string') {
        // @ts-ignore
        tempFunc.constructor = {
          name: data.proto,
        }
      }
      return tempFunc
    } catch (e) {
      return data
    }
  },
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvVHJhbnNmb3JtL0Z1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUE7O0dBRUc7QUFDSCxxQkFBZTtJQUNiLElBQUksRUFBRSxVQUFVO0lBQ2hCLGVBQWUsRUFBZixVQUFnQixJQUFTLEVBQUUsR0FBUTtRQUNqQyxPQUFPLE9BQU8sR0FBRyxLQUFLLFVBQVUsQ0FBQTtJQUNsQyxDQUFDO0lBQ0QsY0FBYyxFQUFkLFVBQWUsSUFBYztRQUMzQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixJQUFJO1lBQ0YsSUFBSSxHQUFHLElBQUk7aUJBQ1IsUUFBUSxFQUFFO2lCQUNWLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDM0Q7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1FBRWQsT0FBTztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksTUFBQTtZQUNKLEtBQUssRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJO1NBQ3BELENBQUE7SUFDSCxDQUFDO0lBQ0QsZ0JBQWdCLEVBQWhCLFVBQWlCLElBQWE7UUFDNUIsSUFBSTtZQUNGLElBQU0sUUFBUSxHQUFHLGNBQVksQ0FBQyxDQUFBO1lBRTlCLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFO29CQUN0QyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQixDQUFDLENBQUE7YUFDSDtZQUVELElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDakMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFO29CQUN0QyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQixDQUFDLENBQUE7YUFDSDtZQUVELElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsYUFBYTtnQkFDYixRQUFRLENBQUMsV0FBVyxHQUFHO29CQUNyQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ2pCLENBQUE7YUFDRjtZQUVELE9BQU8sUUFBUSxDQUFBO1NBQ2hCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQTtTQUNaO0lBQ0gsQ0FBQztDQUNGLENBQUEifQ==
