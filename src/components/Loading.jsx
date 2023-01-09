import React from 'react'

function Loading({center}) {
  return (
    <div className={center ? "loading loading-center" : 'loading'}></div>
  )
}

export default Loading