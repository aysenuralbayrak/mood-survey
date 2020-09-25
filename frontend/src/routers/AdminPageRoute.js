import React from "react";
import { Route, Link } from "react-router-dom";

const errorMessage = (
    <div>
        <h2>Access denied.</h2>
        <p>You don't have permission to access admin page.</p>
        <Link to="/">Login</Link>
    </div>
)

const AdminPageRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={
        (props) => {
            if (localStorage.getItem("token") !== null) {
                return <Component {...props} />
            } else {
                return errorMessage
            }
        }
    }
    />
);
export default AdminPageRoute;