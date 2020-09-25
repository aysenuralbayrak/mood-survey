import React, { Component } from 'react';
import Header from "./Header";
import Options from "./Options";
import SurveyForm from "./SurveyForm";
import database from "../firebase/firebase"
import NotFoundPage from './NotFoundPage';
import FilledAlert from './FilledAlert';
import ThanksPage from './ThanksPage';
import Loading from './Loading';

class SurveyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMood: "",
      note: "",
      isFilled: false,
      isSurveyExist: true,
      loading: true,
      isSurveySubmitted: false,
      isOptionSelected:false
    }
    this.selectMood = this.selectMood.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    (database.ref(`survey-data/${id}`)).once("value").then((snapshot) => {
      const val = snapshot.val();
      if (val === null) {
        this.setState({ isSurveyExist: false, loading: false })
      } else if (val.filled === true) {
        this.setState({ isFilled: true, loading: false })
      } else {
        this.setState({ loading: false })
      }
    })
  }

  selectMood = ((e) => {
    
    const selection = e.target.getAttribute('alt');
    if (selection === "happy") {
      this.setState({isOptionSelected: !this.state.isOptionSelected})
      this.setState({ selectedMood: selection })
    } else if (selection === "neutral") {
      this.setState({ selectedMood: selection })
    } else if (selection === "sad") {
      this.setState({ selectedMood: selection })
    }
  })

  handleSubmit(e) {
    e.preventDefault();
    const id = this.props.match.params.id;
    database.ref("survey-data").child(id).set({ mood: this.state.selectedMood, note: this.state.note, filled: true });
    e.target.elements.note.value = ""
    this.setState({ isSurveySubmitted: true })
  }

  handleChange(e) {
    this.setState({ note: e.target.value });
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    } else if (this.state.isFilled) {
      return <FilledAlert />
    } else if (!this.state.isSurveyExist) {
      return <NotFoundPage />
    } else if (this.state.isSurveySubmitted) {
      return <ThanksPage />
    } else if (!this.state.isFilled && this.state.isSurveyExist) {
      return (
        <div>
          <Header className="header"/>
          <div className="box-layout__survey">
            <div className="box-layout__box">
              <Options selectedMood={this.state.selectedMood} selectMood={this.selectMood} />
              <SurveyForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} note={this.state.note} />
            </div>
          </div>
        </div>
      )
    }
  }
}
export default SurveyPage;
