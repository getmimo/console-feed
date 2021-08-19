'use strict'
exports.__esModule = true
var string_utils_1 = require('./string-utils')
function createAppend(s) {
  var container = document.createDocumentFragment()
  container.appendChild(document.createTextNode(s))
  return container
}
/**
 * @param {string} format
 * @param {!Array.<!SDK.RemoteObject>} parameters
 * @param {!Element} formattedResult
 */
function formatWithSubstitutionString(format, parameters, formattedResult) {
  var formatters = {}
  function stringFormatter(obj) {
    if (typeof obj !== 'string') {
      return ''
    }
    return String(obj)
  }
  function floatFormatter(obj) {
    if (typeof obj !== 'number') return 'NaN'
    return obj
  }
  function integerFormatter(obj) {
    if (typeof obj !== 'number') return 'NaN'
    return Math.floor(obj)
  }
  var currentStyle = null
  function styleFormatter(obj) {
    currentStyle = {}
    var buffer = document.createElement('span')
    buffer.setAttribute('style', obj)
    for (var i = 0; i < buffer.style.length; i++) {
      var property = buffer.style[i]
      if (isWhitelistedProperty(property))
        currentStyle[property] = buffer.style[property]
    }
  }
  function isWhitelistedProperty(property) {
    var prefixes = [
      'background',
      'border',
      'color',
      'font',
      'line',
      'margin',
      'padding',
      'text',
      '-webkit-background',
      '-webkit-border',
      '-webkit-font',
      '-webkit-margin',
      '-webkit-padding',
      '-webkit-text',
    ]
    for (var i = 0; i < prefixes.length; i++) {
      if (property.startsWith(prefixes[i])) return true
    }
    return false
  }
  formatters.s = stringFormatter
  formatters.f = floatFormatter
  // Firebug allows both %i and %d for formatting integers.
  formatters.i = integerFormatter
  formatters.d = integerFormatter
  // Firebug uses %c for styling the message.
  formatters.c = styleFormatter
  function append(a, b) {
    if (b instanceof Node) {
      a.appendChild(b)
    } else if (typeof b !== 'undefined') {
      var toAppend = createAppend(String(b))
      if (currentStyle) {
        var wrapper = document.createElement('span')
        wrapper.appendChild(toAppend)
        applyCurrentStyle(wrapper)
        for (var i = 0; i < wrapper.children.length; ++i)
          applyCurrentStyle(wrapper.children[i])
        toAppend = wrapper
      }
      a.appendChild(toAppend)
    }
    return a
  }
  /**
   * @param {!Element} element
   */
  function applyCurrentStyle(element) {
    for (var key in currentStyle) element.style[key] = currentStyle[key]
  }
  // String.format does treat formattedResult like a Builder, result is an object.
  return string_utils_1.String.format(
    format,
    parameters,
    formatters,
    formattedResult,
    append
  )
}
exports['default'] = formatWithSubstitutionString
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LW1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L2RldnRvb2xzLXBhcnNlci9mb3JtYXQtbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUFzRDtBQUV0RCxTQUFTLFlBQVksQ0FBQyxDQUFTO0lBQzdCLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQ25ELFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRWpELE9BQU8sU0FBUyxDQUFBO0FBQ2xCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBd0IsNEJBQTRCLENBQ2xELE1BQVcsRUFDWCxVQUFlLEVBQ2YsZUFBb0I7SUFFcEIsSUFBTSxVQUFVLEdBQVEsRUFBRSxDQUFBO0lBRTFCLFNBQVMsZUFBZSxDQUFDLEdBQVE7UUFDL0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxFQUFFLENBQUE7U0FDVjtRQUVELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BCLENBQUM7SUFFRCxTQUFTLGNBQWMsQ0FBQyxHQUFRO1FBQzlCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUTtZQUFFLE9BQU8sS0FBSyxDQUFBO1FBQ3pDLE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsR0FBUTtRQUNoQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQTtRQUN6QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELElBQUksWUFBWSxHQUFRLElBQUksQ0FBQTtJQUM1QixTQUFTLGNBQWMsQ0FBQyxHQUFRO1FBQzlCLFlBQVksR0FBRyxFQUFFLENBQUE7UUFDakIsSUFBTSxN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
