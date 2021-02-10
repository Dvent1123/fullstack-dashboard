import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({isShowing, hide, onSubmit, setName, name, location, setLocation, setStatus,status, description, setDescription}) => isShowing ? ReactDom.createPortal(
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
                            <label htmlFor="name">Name</label>
                            <input className="form-control" id="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location of Asset</label>
                            <input type="text" className="form-control" id="location"
                            placeholder="Baseline Rd. and Rural St." 
                            value={location} onChange={(e)=> setLocation(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description of Asset</label>
                            <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} rows="5"></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status of Asset: </label>
                            <select id="status" value={status} onChange={(e)=> setStatus(e.target.value)}>
                                <option value="0">Select a Status</option>
                                <option value="1">Immediate Action Required</option>
                                <option value="2">Needs Service</option>
                                <option value="3">Good Condition</option>
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

export default Modal
