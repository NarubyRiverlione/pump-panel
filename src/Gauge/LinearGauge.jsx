/* eslint-disable */
Object.defineProperty(exports, '__esModule', {
  value: true,
})

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key] } } } return target }

const _react = require('react')

const _react2 = _interopRequireDefault(_react)

const _canvasGauges = require('canvas-gauges')

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj } }

function ReactRadialGauge(props) {
  let el = void 0;

  (0, _react.useEffect)(() => {
    const options = { ...props, renderTo: el }

    const gauge = new _canvasGauges.LinearGauge(options).draw()
    gauge.value = props.value
    gauge.update(options)
  })

  return _react2.default.createElement('canvas', {
    ref: function ref(canvas) {
      el = canvas
    },
  })
}

exports.default = ReactRadialGauge
