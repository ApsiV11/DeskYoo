import React from 'react'

import utils from '../../services/utils'

import socket from '../../services/connect'

const MessageBox = ({id, text, votes, location, color, time, messageType, cm}) => {
  const colorIndex = color ? color : 0

  const colors=['#E0BBE4', '#AC91C8', '#D291BC', '#FEC8D8', '#FFDFD3']

  const styles = {
    backgroundColor: colors[colorIndex],
    border: '2px solid gray',
  }
  
  const timeText = utils.getTimeText(time)

  const handleClick = (event) => {
    if(messageType==='Answer'){
      return
    }

    if(messageType==='Thread'){
      return handleThreadClick(event, id)
    }

    if(messageType==='OpenedThread'){
      return handleOpenedThreadClick(event, cm)
    }
  }

  return(
    <div className='message' style={styles}>
      <table className='messageTable'>
        <tr>
          <td onClick={handleClick} className='infoCell' rowSpan='2' valign='top'>
            {text}
          </td>
          <td className='voteCell' valign='top'>▲</td>
        </tr>
        <tr>
          <td className='voteCell'>
              {votes}
          </td>
        </tr>
        <tr>
          <td className='infoCell'>
            <span role="img" aria-label='Location'>{timeText} ago 📍{location} [Options]</span>
          </td>
          <td className='voteCell'>▼</td>
        </tr>
      </table>
    </div>
  )
}

const handleOpenedThreadClick = (event, cm) => {
  event.preventDefault()
  cm()
}

const handleThreadClick = (event, id) => {
  //console.log('thread click')
  event.preventDefault()
  document.getElementById('root').style.pointerEvents = 'none'

  socket.emit('GETANSWERSDISPLAYINFO', id)
}

export default MessageBox