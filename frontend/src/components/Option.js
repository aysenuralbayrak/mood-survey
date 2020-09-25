import React from "react";

function Option(props) {
    return (
        <img className={props.altValue===props.selectedMood ? "selected" : "button__image"} src={props.imgUrl} onClick={props.selectMood} alt={props.altValue}></img>
    )
}
export default Option