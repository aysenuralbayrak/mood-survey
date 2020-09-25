import React, { Component } from "react";
import Option from "./Option";

class Options extends Component {
    constructor(props) {
        
        super();
    }
    render() {
        return (
            <div>
            
                <p className="text">How do you feel about your day at work?</p>
                <Option  imgUrl={"/images/Happy.png"} selectMood={this.props.selectMood} selectedMood = {this.props.selectedMood} altValue="happy"></Option>
                <Option  imgUrl={"/images/Neutral.png"} selectMood={this.props.selectMood} selectedMood = {this.props.selectedMood} altValue="neutral"></Option>
                <Option  imgUrl={"/images/Sad.png"} selectMood={this.props.selectMood} selectedMood = {this.props.selectedMood} altValue="sad"></Option>
            </div>
        )
    }
}
export default Options