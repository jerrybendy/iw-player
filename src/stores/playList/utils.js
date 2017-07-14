/**
 *
 * @author    Jerry Bendy
 * @since     7/14/2017
 */

export default {
  isIdExists (list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return true
      }
    }
    return false
  },
  getItemIndex (list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return i
      }
    }
    return false
  },
}
