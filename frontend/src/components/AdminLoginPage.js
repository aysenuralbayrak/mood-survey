import React, { Component } from 'react';
import { firebase } from "../firebase/firebase";
import { history } from "../routers/AppRouter";

class AdminLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            idToken: "",
            isLoggedIn: false,
            errorMessage:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserEmail = this.handleUserEmail.bind(this);
        this.handleUserPass = this.handleUserPass.bind(this);
    }
    handleUserEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleUserPass(e) {
        this.setState({ pass: e.target.value });
    }
    async handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass);
            const token = await result.user.getIdToken(true);
            localStorage.setItem("token", token);
            history.push("/administration");
        } catch (e) {
            this.setState({errorMessage:"The email or password is not valid."})
        }
    }
    render() {
        return (
            <div className="box-layout__login">
                <div className="box-layout__box__login" >
                    <form onSubmit={this.handleSubmit}>
                        <p className="box-layout__title__login" >Mood Survey Administration</p>
                        
                        <input className="input-text__login"
                            placeholder="Email"
                            type='text'
                            value={this.state.email}
                            onChange={this.handleUserEmail}
                            name='email-text'>
                        </input>
                        <input className="input-text__login"
                            placeholder="Password"
                            type='password'
                            value={this.state.pass}
                            onChange={this.handleUserPass}
                            name="email-password">
                        </input>
                        <button className="button">Login</button>
                        {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}
                    </form>
                </div>
            </div>
        )
    }
}
export default AdminLoginPage; 