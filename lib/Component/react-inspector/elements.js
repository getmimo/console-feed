'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
exports.Constructor = exports.HTML = exports.Table = exports.Root = void 0
var theme_1 = __importDefault(require('../theme'))
/**
 * Object root
 */
exports.Root = theme_1['default']('div')({
  display: 'inline-block',
  wordBreak: 'break-all',
  '&::after': {
    content: "' '",
    display: 'inline-block',
  },
  '& > li, & > ol, & > details': {
    backgroundColor: 'transparent !important',
    display: 'inline-block',
  },
  '& ol:empty': {
    paddingLeft: '0 !important',
  },
})
/**
 * Table
 */
exports.Table = theme_1['default']('span')({
  '& > li': {
    display: 'inline-block',
    marginTop: 5,
  },
})
/**
 * HTML
 */
exports.HTML = theme_1['default']('span')({
  display: 'inline-block',
  '& div:hover': {
    backgroundColor: 'rgba(255, 220, 158, .05) !important',
    borderRadius: '2px',
  },
})
/**
 * Object constructor
 */
exports.Constructor = theme_1['default']('span')({
  '& > span > span:nth-child(1)': {
    opacity: 0.6,
  },
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQ29tcG9uZW50L3JlYWN0LWluc3BlY3Rvci9lbGVtZW50cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQTZCO0FBRTdCOztHQUVHO0FBQ1UsUUFBQSxJQUFJLEdBQUcsa0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxPQUFPLEVBQUUsY0FBYztJQUN2QixTQUFTLEVBQUUsV0FBVztJQUN0QixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxjQUFjO0tBQ3hCO0lBQ0QsNkJBQTZCLEVBQUU7UUFDN0IsZUFBZSxFQUFFLHdCQUF3QjtRQUN6QyxPQUFPLEVBQUUsY0FBYztLQUN4QjtJQUNELFlBQVksRUFBRTtRQUNaLFdBQVcsRUFBRSxjQUFjO0tBQzVCO0NBQ0YsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDVSxRQUFBLEtBQUssR0FBRyxrQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDO0tBQ2I7Q0FDRixDQUFDLENBQUE7QUFFRjs7R0FFRztBQUNVLFFBQUEsSUFBSSxHQUFHLGtCQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsT0FBTyxFQUFFLGNBQWM7SUFDdkIsYUFBYSxFQUFFO1FBQ2IsZUFBZSxFQUFFLHFDQUFxQztRQUN0RCxZQUFZLEVBQUUsS0FBSztLQUNwQjtDQUNGLENBQUMsQ0FBQTtBQUVGOztHQUVHO0FBQ1UsUUFBQSxXQUFXLEdBQUcsa0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4Qyw4QkFBOEIsRUFBRTtRQUM5QixPQUFPLEVBQUUsR0FBRztLQUNiO0NBQ0YsQ0FBQyxDQUFBIn0=
