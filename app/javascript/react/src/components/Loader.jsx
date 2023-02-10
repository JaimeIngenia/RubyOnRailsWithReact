import React from 'react'

export const Loader = (props) => {
  return (
    <div>

      { !props.isShowLoader ?
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
    :

    ''
      }
    </div>
  )
}
