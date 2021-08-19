'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
exports.__esModule = true
exports.Content =
  exports.AmountIcon =
  exports.Icon =
  exports.Message =
  exports.Root =
    void 0
var theme_1 = __importDefault(require('./theme'))
/**
 * Return themed log-method style
 * @param style The style
 * @param type The method
 */
var Themed = function (style, method, styles) {
  return (
    styles['LOG_' + method.toUpperCase() + '_' + style.toUpperCase()] ||
    styles['LOG_' + style.toUpperCase()]
  )
}
/**
 * console-feed
 */
exports.Root = theme_1['default']('div')({
  wordBreak: 'break-word',
  width: '100%',
})
/**
 * console-message
 */
exports.Message = theme_1['default']('div')(function (_a) {
  var _b = _a.theme,
    styles = _b.styles,
    method = _b.method
  return {
    position: 'relative',
    display: 'flex',
    color: Themed('color', method, styles),
    backgroundColor: Themed('background', method, styles),
    borderTop: '1px solid ' + Themed('border', method, styles),
    borderBottom: '1px solid ' + Themed('border', method, styles),
    marginTop: -1,
    marginBottom: +/^warn|error$/.test(method),
    paddingLeft: 10,
    boxSizing: 'border-box',
    '& *': {
      verticalAlign: 'top',
      boxSizing: 'border-box',
      fontFamily: styles.BASE_FONT_FAMILY,
      whiteSpace: 'pre-wrap',
      fontSize: styles.BASE_FONT_SIZE,
    },
    '& a': {
      color: 'rgb(177, 177, 177)',
    },
  }
})
/**
 * message-icon
 */
exports.Icon = theme_1['default']('div')(function (_a) {
  var _b = _a.theme,
    styles = _b.styles,
    method = _b.method
  return {
    width: styles.LOG_ICON_WIDTH,
    height: styles.LOG_ICON_HEIGHT,
    backgroundImage: Themed('icon', method, styles),
    backgroundRepeat: 'no-repeat',
    backgroundSize: styles.LOG_ICON_BACKGROUND_SIZE,
    backgroundPosition: '50% 50%',
  }
})
/**
 * message-amount
 */
exports.AmountIcon = theme_1['default']('div')(function (_a) {
  var _b = _a.theme,
    styles = _b.styles,
    method = _b.method
  return {
    height: '16px',
    margin: '1px 0',
    whiteSpace: 'nowrap',
    fontSize: '10px',
    lineHeight: '17px',
    padding: '0px 3px',
    background: Themed('amount_background', method, styles),
    color: Themed('amount_color', method, styles),
    borderRadius: '8px',
    minWidth: '18px',
    textAlign: 'center',
  }
})
/**
 * console-content
 */
exports.Content = theme_1['default']('div')(function (_a) {
  var styles = _a.theme.styles
  return {
    clear: 'right',
    position: 'relative',
    padding: styles.PADDING,
    marginLeft: 15,
    minHeight: 18,
    flex: 'auto',
    width: 'calc(100% - 15px)',
  }
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tcG9uZW50L2VsZW1lbnRzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBNEI7QUFFNUI7Ozs7R0FJRztBQUNILElBQU0sTUFBTSxHQUFHLFVBQ2IsS0FBYSxFQUNiLE1BQWMsRUFDZCxNQUFrQztJQUVsQyxPQUFBLE1BQU0sQ0FBQyxTQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUUsU0FBSSxLQUFLLENBQUMsV0FBVyxFQUFJLENBQUM7UUFDNUQsTUFBTSxDQUFDLFNBQU8sS0FBSyxDQUFDLFdBQVcsRUFBSSxDQUFDO0FBRHBDLENBQ29DLENBQUE7QUFFdEM7O0dBRUc7QUFDVSxRQUFBLElBQUksR0FBRyxrQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLFNBQVMsRUFBRSxZQUFZO0lBQ3ZCLEtBQUssRUFBRSxNQUFNO0NBQ2QsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDVSxRQUFBLE9BQU8sR0FBRyxrQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQUMsRUFBNkI7UUFBM0IsYUFBeUIsRUFBaEIsTUFBTSxZQUFBLEVBQUUsTUFBTSxZQUFBO0lBQVMsT0FBQSxDQUFDO1FBQ3ZFLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN0QyxlQUFlLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3JELFNBQVMsRUFBRSxlQUFhLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRztRQUMxRCxZQUFZLEVBQUUsZUFBYSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUc7UUFDN0QsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNiLFlBQVksRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFDLFdBQVcsRUFBRSxFQUFFO1FBQ2YsU0FBUyxFQUFFLFlBQVk7UUFDdkIsS0FBSyxFQUFFO1lBQ0wsYUFBYSxFQUFFLEtBQUs7WUFDcEIsU0FBUyxFQUFFLFlBQVk7WUFDdkIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7WUFDbkMsVUFBVSxFQUFFLFVBQVU7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxjQUFjO1NBQ2hDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLG9CQUFvQjtTQUM1QjtLQUNGLENBQUM7QUFyQnNFLENBcUJ0RSxDQUFDLENBQUE7QUFFSDs7R0FFRztBQUNVLFFBQUEsSUFBSSxHQUFHLGtCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBQyxFQUE2QjtRQUEzQixhQUF5QixFQUFoQixNQUFNLFlBQUEsRUFBRSxNQUFNLFlBQUE7SUFBUyxPQUFBLENBQUM7UUFDcEUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1FBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsZUFBZTtRQUM5QixlQUFlLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQy9DLGdCQUFnQixFQUFFLFdBQVc7UUFDN0IsY0FBYyxFQUFFLE1BQU0sQ0FBQyx3QkFBd0I7UUFDL0Msa0JBQWtCLEVBQUUsU0FBUztLQUM5QixDQUFDO0FBUG1FLENBT25FLENBQUMsQ0FBQTtBQUVIOztHQUVHO0FBQ1UsUUFBQSxVQUFVLEdBQUcsa0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFDLEVBQTZCO1FBQTNCLGFBQXlCLEVBQWhCLE1BQU0sWUFBQSxFQUFFLE1BQU0sWUFBQTtJQUFTLE9BQUEsQ0FBQztRQUMxRSxNQUFNLEVBQUUsTUFBTTtRQUNkLE1BQU0sRUFBRSxPQUFPO1FBQ2YsVUFBVSxFQUFFLFFBQVE7UUFDcEIsUUFBUSxFQUFFLE1BQU07UUFDaEIsVUFBVSxFQUFFLE1BQU07UUFDbEIsT0FBTyxFQUFFLFNBQVM7UUFDbEIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3ZELEtBQUssRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDN0MsWUFBWSxFQUFFLEtBQUs7UUFDbkIsUUFBUSxFQUFFLE1BQU07UUFDaEIsU0FBUyxFQUFFLFFBQVE7S0FDcEIsQ0FBQztBQVp5RSxDQVl6RSxDQUFDLENBQUE7QUFFSDs7R0FFRztBQUNVLFFBQUEsT0FBTyxHQUFHLGtCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBQyxFQUFxQjtRQUFWLE1BQU0sa0JBQUE7SUFBUyxPQUFBLENBQUM7UUFDL0QsS0FBSyxFQUFFLE9BQU87UUFDZCxRQUFRLEVBQUUsVUFBVTtRQUNwQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87UUFDdkIsVUFBVSxFQUFFLEVBQUU7UUFDZCxTQUFTLEVBQUUsRUFBRTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osS0FBSyxFQUFFLG1CQUFtQjtLQUMzQixDQUFDO0FBUjhELENBUTlELENBQUMsQ0FBQSJ9
