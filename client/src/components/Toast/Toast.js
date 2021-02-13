import React, { useState, useEffect } from 'react'
import '../../assets/Toast.css'

const Toast = (props) => {
//THIS IS WHAT A TOAST LOOKS LIKE
    //     {
    //   id: 1,
    //   title: 'Success',
    //   description: 'This is a success toast component',
    //   backgroundColor: '#5cb85c',
    //   icon: checkIcon
    // }
    const { toast, position } = props

    return (
        <>
            <div className={`notification-container ${position}`}>
                        <div className={`notification toast ${position}`} style={{backgroundColor: toast.backgroundColor}}>
                            <button>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
            </div>
        </>

    )
}

export default Toast
