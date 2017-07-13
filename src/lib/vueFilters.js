/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

import Vue from 'vue'

/**
 * Convert a number to a time string, such as `03:17`
 */
Vue.filter('numberToTime', function (value) {
  value = parseInt(value)
  const m = Math.floor(value / 60)
  const s = value % 60
  return `${zeroPad(m)}:${zeroPad(s)}`
})


function zeroPad(number) {
  return (number < 10 ? '0' : '') + number
}
