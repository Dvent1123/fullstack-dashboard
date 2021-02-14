import React from 'react'
import ReactDom from 'react-dom'
import '../../assets/Toast.css'

//THIS IS WHAT A TOAST LOOKS LIKE
    //     {
    //   id: 1,
    //   title: 'Success',
    //   description: 'This is a success toast component',
    //   backgroundColor: '#5cb85c',
    //   icon: checkIcon
    // }


const Toast = ({ toast, position, isShowing, hide })  => isShowing ? ReactDom.createPortal(
        <>
            <div className={`notification-container ${position}`}>
                        <div className={`notification toast ${position}`} style={{backgroundColor: toast.backgroundColor}}>
                            <button onClick={hide}>
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
        </>, document.body
) : null;

export default Toast
