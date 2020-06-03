import React from 'react'

function index(props) {
  return (
    <div 
      key={props.key}
      style={{
        height: 40,
        width: 40,
        marginRight: 0,
        marginLeft: 0,
        marginTop: -2,
        marginBottom: -2,
        border: '1px solid black',
        display: 'inline-block',
        background: props.player ? 'red': props.stripe ? 'green' : undefined
      }}>
    </div>
  )
}

export default index
