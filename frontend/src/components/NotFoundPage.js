import React, { Component } from "react";

class NotFoundPage extends Component {
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box" >
                    <h1>404</h1>
                    <p>Oops! Page not found</p>
                    <p>The requested URL was not found on this server.</p>
                </div>
            </div>
        )
    }
}
export default NotFoundPage;