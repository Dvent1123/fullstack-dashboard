import React from 'react'
import {Link} from 'react-router-dom'
import '../../assets/Landing.css'


const Landing = () => {
    return (
        <>
            <div className="landing">
                <div className="landing-wrapper">
                    <div className="landing-content">
                        <div className="landing-title">
                            <h1>This is the landing Page</h1>
                        </div>
                        <div className="landing-links">
                            <div className="links">
                                <Link to="/register">Register</Link>
                            </div>
                            <div className="links">
                                <Link to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                {/* <Route exact path='/register' component={Register} /> */}
        </>
    )
}

export default Landing
