/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const prefix = 'PLAY_LIST'

export default {
  // mutations
  ADD: `${prefix}/ADD`,  // add a new sound into list
  _REMOVE: `${prefix}/_REMOVE`,
  UPDATE: `${prefix}/UPDATE`,  // update sound info
  SET_LIST: `${prefix}/SET_LIST`,

  // actions
  REMOVE: `${prefix}/REMOVE`,
}
