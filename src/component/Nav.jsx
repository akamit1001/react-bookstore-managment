import React from 'react'
import {Link} from 'react-router-dom'
export const Nav = () => {
    return (
        <div>
            <nav className="navbar shadow fixed-top navbar-expand-sm navbar-dark bg-primary">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        React Book Store
                    </Link>
                    <div> <Link to="/" className="btn btn-light mx-2"> Books</Link>
                    <Link to="/customers" className="btn btn-light mx-2"> Customers</Link>
                    <Link to="/orders" className="btn btn-light mx-2"> Orders</Link>
                    <Link to="/viewrating" className="btn btn-light mx-2"> Ratings</Link>

                    
                    </div>
                </div>
            </nav>
        </div>
    )
}
