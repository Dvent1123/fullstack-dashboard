import React from 'react'
import ReactDom from 'react-dom'

const AssetsModal = ({isShowing, hide, onSubmit, 
    assignedTo, setAssignedTo, 
     assetName, description, setDescription,
    status, setStatus}) => isShowing ? ReactDom.createPortal(
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
                        {/* This can stay for now but gonna have to get values from database */}
                        <div className="form-group">
                            <label htmlFor="assignedTo">Task Assigned To: </label>
                            <select id="assignedTo" value={assignedTo} onChange={(e)=> setAssignedTo(e.target.value)}>
                                <option value="None">None</option>
                                <option value="Eddy">Eddy</option>
                                <option value="Justin">Justin</option>
                            </select>    
                        </div>
                        <div className="form-group">
                            <label htmlFor="assetId">Task to be completed on which Asset: {assetName}</label>
                        </div>           
                        <div className="form-group">
                            <label htmlFor="desc">Description of Task</label>
                            <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} rows="5"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status of Tasks: </label>
                            <select id="status" value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option value="0">Select a Status</option>
                                <option value="1">Not Complete</option>
                                <option value="2">In Progress</option>
                                <option value="3">Pending Approval</option>
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

export default AssetsModal
