/**
 *
 * @author    Jerry Bendy
 * @since     7/17/2017
 */

import {remote, shell} from 'electron'
import store from '../../stores'
import playStateTypes from '../../stores/playState/types'
import playListTypes from '../../stores/playList/types'

const {Menu} = remote

export default function (data) {
  const menuTemplate = [
    {
      label: 'Play',
      click () {
        store.commit(playStateTypes.STOP)
        store.dispatch(playStateTypes.PLAY_FROM_LIST, data)
      }
    },
    {
      type: 'separator',
    },
    {
      label: 'Remove from list',
      click () {
        store.dispatch(playListTypes.REMOVE, data.id)
      }
    },
    {
      type: 'separator',
    },
    {
      label: 'Open in finder',
      click () {
        shell.showItemInFolder(data.path)
      },
    },
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  menu.popup()

  return menu
}
