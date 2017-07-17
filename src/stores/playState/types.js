/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const prefix = 'PLAY_STATE'

export default {
  // mutations
  PLAY: `${prefix}/PLAY`,
  _SET_CURRENT: `${prefix}/_SET_CURRENT`, // only set current playing sound, without play it
  PAUSE: `${prefix}/PAUSE`,
  STOP: `${prefix}/STOP`,
  SEEK: `${prefix}/SEEK`,
  CHANGE_IS_PLAYING: `${prefix}/CHANGE_IS_PLAYING`,

  CHANGE_GAIN: `${prefix}/CHANGE_GAIN`,
  TOGGLE_MUTE: `${prefix}/TOGGLE_MUTE`,

  // actions
  PLAY_FROM_LIST: `${prefix}/PLAY_FROM_LIST`,
  LOAD_FROM_LIST_AND_SEEK: `${prefix}/LOAD_FROM_LIST_AND_SEEK`,
}
