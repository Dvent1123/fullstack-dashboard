import React from 'react'
import ReactDom from 'react-dom'

const ModalUsers = ({isShowing, hide, onSubmit, 
    userName, setUserName,
    password, setPassword,
    role, setRole,
    job, setJob}) => isShowing ? ReactDom.createPortal(
    <> 
        <div className="modal-overlay">
            <div className="modal-wrapper" tabIndex={-1} aria-modal aria-hidden  role="dialog">
                <div className="modal">
                    <div className="modal-header">
                        <button className="modal-close-button" onClick={hide} type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>                  
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className="form-control" id="username" value={userName} onChange={(e)=> setUserName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="job">Job</label>
                            <input className="form-control" id="job" value={job} onChange={(e)=> setJob(e.target.value)}/>
                        </div>
                        {/* This can stay for now but gonna have to get values from database */}
                        <div className="form-group">
                            <label htmlFor="role">Security Role: </label>
                            <select id="role" value={role} onChange={(e)=> setRole(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>    
                        </div>        
                        <div className="form-group">
                            <button className="form-button" type="submit">
                            Submit
                            </button>
                        </div>

                        </form>
                </div>
            </div>
        </div>
    </>, document.body
) : null;

export default ModalUsers
