/**
 *
 * @author    Jerry Bendy
 * @since     7/13/2017
 */

const prefix = 'PLAY_STATE'

export default {
  PLAY: `${prefix}/PLAY`,
  PLAY_FILE: `${prefix}/PLAY_FILE`,
  PLAY_FROM_LIST: `${prefix}/PLAY_FROM_LIST`,
  PLAY_END: `${prefix}/PLAY_END`,
  PAUSE: `${prefix}/PAUSE`,
  STOP: `${prefix}/STOP`,
  SEEK: `${prefix}/SEEK`,

  CHANGE_GAIN: `${prefix}/CHANGE_GAIN`,
  TOGGLE_MUTE: `${prefix}/TOGGLE_MUTE`,
}
