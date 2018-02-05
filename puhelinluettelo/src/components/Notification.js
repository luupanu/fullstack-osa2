import React from 'react'

const Notification = ({message}) => {
  return !message ? null :
    <div className="message">
      {message}
    </div>
}

export default Notification