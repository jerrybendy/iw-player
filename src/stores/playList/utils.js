/**
 *
 * @author    Jerry Bendy
 * @since     7/14/2017
 */

import store from '../../stores'

export default {
  /**
   * Check if an id is exists
   *
   * @param id
   * @returns {boolean}
   */
  isIdExists (id) {
    const list = store.state.playList
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return true
      }
    }
    return false
  },

  /**
   * Get an item's index of the list by its id
   *
   * @param id
   * @returns {*}
   */
  getItemIndex (id) {
    const list = store.state.playList
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return i
      }
    }
    return false
  },

  /**
   * Get  a playList item by its id
   *
   * @param id
   * @returns {*}
   */
  getItemById (id) {
    const list = store.state.playList
    if (!id)
      return false

    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return list[i]
      }
    }
    return false
  },
}
