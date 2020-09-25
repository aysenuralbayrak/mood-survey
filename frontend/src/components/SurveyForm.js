import React from "react";

function SurveyForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <p>Tell us more about it: </p>
      <textarea maxLength="200" name="note" value={props.note} onChange={props.handleChange}></textarea>
      <p className="text__small">Your feedback will be anonymus!</p>
      <button className="button__submit">Submit your feedback</button>
    </form>
  )
}
export default SurveyForm;