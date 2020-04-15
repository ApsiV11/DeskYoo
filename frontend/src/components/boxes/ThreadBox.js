import React from 'react'

import socket from '../../services/connect'

const ThreadBox = ({id, text, likes, location, color, time}) => {

  const colorIndex = color ? color : 0


  const colors=['#E0BBE4', '#AC91C8', '#D291BC', '#FEC8D8', '#FFDFD3']
    
  const br=('2px solid gray')
  const bc=colors[colorIndex]


  const styles = {
    backgroundColor: bc,
    border: br,
    textAlign: 'left',
    padding: '2%',
    width: '90%',
    borderRadius: '10px',
    marginTop: '0%',
    marginLeft: '0%',
    marginRight: '0%',
    marginBottom: '1%'
  }
  
  let timeDifference = (new Date() - time) / 1000;
  let timeText = ''
  if(timeDifference < 60) {
    timeText = Math.round(timeDifference) + "s"
  } else if(timeDifference < 3600) {
    timeText = Math.round(timeDifference / 60) + "min"
  } else if(timeDifference < 86400) {
    timeText = Math.round(timeDifference / 3600) + "h"
  } else {
    timeText = Math.round(timeDifference / 86400) + "d"
  }

  return (
    <div>
      <button onClick={e => handleThreadClick(e, id)}  style={styles} className='message'>  
        <div className="multilineText">{text}</div>
        <br></br>
        <span role="img" aria-label='Location'>{timeText} ago 📍{location}</span>
      </button>
      <div className="messageLikeContainer">
        <button className="likeButton">▲</button>
        <p id="likeText">{likes}</p>
        <button className="likeButton">▼</button>
      </div>
    </div>
  )


  }
  
  const handleThreadClick = (event, id) => {
    //console.log('thread click')
    event.preventDefault()
    document.getElementById('root').style.pointerEvents = 'none'

    socket.emit('GETANSWERSDISPLAYINFO', id)
  }

export default ThreadBox