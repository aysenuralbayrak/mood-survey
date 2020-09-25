import React, { Component } from "react";

class FilledAlert extends Component {
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box" >
                    <p>Survey is already filled!</p>
                </div>
            </div>
        )
    }
}
export default FilledAlert;