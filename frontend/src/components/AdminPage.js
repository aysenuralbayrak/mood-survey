import React, { Component } from "react";
import { firebase } from "../firebase/firebase"
import axios from "axios";
import { history } from "../routers/AppRouter";
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailList: [],
            selectedMood: "",
            note: "",
            showMessage: false,
            errorMessage:""
        }
        this.sendEmail = this.sendEmail.bind(this);
        this.logout = this.logout.bind(this);
        this.handleFileChosen = this.handleFileChosen.bind(this);
        this.handleFileRead = this.handleFileRead.bind(this);
    }
    async sendEmail(e) {
        e.preventDefault();
        const { emailList } = this.state;
        for (let i = 0; i <= this.state.emailList.length - 2; i++) {
            const createdSurveyData = await firebase.database().ref("survey-data").push({ mood: "", note: "", filled: "false" });
            const key = createdSurveyData.key;
            const email = emailList[i]
            await axios.post('/api/send-email', {
                email,
                key
            },
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            ).then(()=> this.setState({showMessage:true}))
            .catch(()=> this.setState({errorMessage:"Operation failed. Email could not send."}))
        }
    }
    async logout(e) {
        e.preventDefault();
        await firebase.auth().signOut();
        localStorage.removeItem("token")
        history.push("/"); 
    }
    handleFileRead = (e) => {
        const content = e.target.result;
        const fileContent = content.split("\r\n");
        this.setState({ emailList: fileContent })
    };

    handleFileChosen = (file) => {
        let fileReader = new FileReader();
        fileReader.onloadend = this.handleFileRead;
        fileReader.readAsText(file);
    };

    render() {

        return (
            <div>
                <div className="header">
                    <h1 className="header__title">Mood Survey</h1>
                    <button className="button__header" onClick={this.logout}>Log Out</button>
                </div>
                <div className="box-layout__admin">
                    <div className="box-layout__box__admin" >
                        <h2>Share Survey!</h2>
                        <div className="input__container">
                            <form onSubmit={this.sendEmail}>
                                <div className="button__upload-div">
                                    <input
                                        className="button__input-file"
                                        type='file'
                                        id="file-input"
                                        accept='.csv'
                                        onChange={e => this.handleFileChosen(e.target.files[0])}
                                    />
                                    <label htmlFor="file-input" >Upload Users</label>
                                </div>
                                <div className="input__email">
                                    {this.state.emailList.map((item, i) =>
                                        <li key={i}>{item}</li>
                                    )}
                                </div>
                                <button className="button__send">Send Email</button>
                            </form>
                            <div className="text__small">
                                {this.state.showMessage && <p>Email sent ✓ </p>}
                                {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminPage;