'use strict'
// Sandbox HTML elements
exports.__esModule = true
function _getSandboxSafely() {
  var sandbox = document.implementation.createHTMLDocument('sandbox')
  return sandbox
}
function objectifyAttributes(element) {
  var data = {}
  for (var _i = 0, _a = element.attributes; _i < _a.length; _i++) {
    var attribute = _a[_i]
    data[attribute.name] = attribute.value
  }
  return data
}
/**
 * Serialize a HTML element into JSON
 */
exports['default'] = {
  type: 'HTMLElement',
  shouldTransform: function (type, obj) {
    return (
      obj &&
      obj.children &&
      typeof obj.innerHTML === 'string' &&
      typeof obj.tagName === 'string'
    )
  },
  toSerializable: function (element) {
    return {
      tagName: element.tagName.toLowerCase(),
      attributes: objectifyAttributes(element),
      innerHTML: element.innerHTML,
    }
  },
  fromSerializable: function (data) {
    try {
      var element = _getSandboxSafely().createElement(data.tagName)
      element.innerHTML = data.innerHTML
      for (
        var _i = 0, _a = Object.keys(data.attributes);
        _i < _a.length;
        _i++
      ) {
        var attribute = _a[_i]
        try {
          element.setAttribute(attribute, data.attributes[attribute])
        } catch (e) {}
      }
      return element
    } catch (e) {
      return data
    }
  },
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFRNTC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UcmFuc2Zvcm0vSFRNTC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0JBQXdCOztBQUV4QixTQUFTLGlCQUFpQjtJQUN4QixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JFLE9BQU8sT0FBTyxDQUFBO0FBQ2hCLENBQUM7QUFVRCxTQUFTLG1CQUFtQixDQUFDLE9BQVk7SUFDdkMsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2YsS0FBc0IsVUFBa0IsRUFBbEIsS0FBQSxPQUFPLENBQUMsVUFBVSxFQUFsQixjQUFrQixFQUFsQixJQUFrQixFQUFFO1FBQXJDLElBQUksU0FBUyxTQUFBO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQTtLQUN2QztJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQUVEOztHQUVHO0FBQ0gscUJBQWU7SUFDYixJQUFJLEVBQUUsYUFBYTtJQUNuQixlQUFlLEVBQWYsVUFBZ0IsSUFBUyxFQUFFLEdBQVE7UUFDakMsT0FBTyxDQUNMLEdBQUc7WUFDSCxHQUFHLENBQUMsUUFBUTtZQUNaLE9BQU8sR0FBRyxDQUFDLFNBQVMsS0FBSyxRQUFRO1lBQ2pDLE9BQU8sR0FBRyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQ2hDLENBQUE7SUFDSCxDQUFDO0lBQ0QsY0FBYyxFQUFkLFVBQWUsT0FBb0I7UUFDakMsT0FBTztZQUNMLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTtZQUN0QyxVQUFVLEVBQUUsbUJBQW1CLENBQUMsT0FBTyxDQUFDO1lBQ3hDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztTQUNsQixDQUFBO0lBQ2QsQ0FBQztJQUNELGdCQUFnQixFQUFoQixVQUFpQixJQUFhO1FBQzVCLElBQUk7WUFDRixJQUFNLE9BQU8sR0FBRyxpQkFBaUIsRUFBRSxDQUFDLGFBQWEsQ0FDL0MsSUFBSSxDQUFDLE9BQU8sQ0FDRSxDQUFBO1lBQ2hCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtZQUNsQyxLQUFzQixVQUE0QixFQUE1QixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUE1QixjQUE0QixFQUE1QixJQUE0QixFQUFFO2dCQUEvQyxJQUFJLFNBQVMsU0FBQTtnQkFDaEIsSUFBSTtvQkFDRixPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7aUJBQzVEO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7YUFDZjtZQUNELE9BQU8sT0FBTyxDQUFBO1NBQ2Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFBO1NBQ1o7SUFDSCxDQUFDO0NBQ0YsQ0FBQSJ9
