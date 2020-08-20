import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Signup.css'; 
import firebase from '../../Services/Firebase';
import {Card} from 'react-bootstrap';
import LoginString from '../Login/LoginStrings';
import { CssBaseline, TextField, Box, Typography} from '@material-ui/core';

const Signinsee = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
  backgroundColor: '#27813b',
  width: '100%',
  boxShadow: '0 5px 5px #808888',
  height: '10rem',
  paddingTop: '48px',
  opacity: '0.5',
  borderBottom: '5px solid green',
} 


class Signup extends Component {
  constructor(){
      super();
      this.state = {
          email: "",
          password: "",
          name: "",
          error: null
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit(event){
    const {name, password, email}=this.state;
    event.preventDefault();
    try{
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        firebase.firestore().collection("users")
        .add({
          name,
          id: result.user.uid,
          email,
          password,
          URL: "",
          description: "",
          message: [{notificationId:"",number: 0}]
        }).then((docRef) => {
          localStorage.setItem(LoginString.ID, result.user.uid);
          localStorage.setItem(LoginString.Name, name);
          localStorage.setItem(LoginString.Email, email);
          localStorage.setItem(LoginString.Password, password);
          localStorage.setItem(LoginString.PhotoURL, "");
          localStorage.setItem(LoginString.UPLOAD_CHANGED, "state_changed");
          localStorage.setItem(LoginString.Description, "");
          localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id);
          this.setState({
            name: "",
            password: "",
            url: "",
          });
          this.props.history.push("/chat")
        })
        .catch((error) => {
           console.error("Error adding document", error)
        })
      })
    }
    catch(error){
      document.getElementById("1").innerHTML = "Error in signing up please try again"
    }
  }

  render() {
    return (
      <div>
        <CssBaseline/>
        <Card style={Signinsee}>
            <div>
              <Typography component="h5" variant="h5">
                Sign Up
                to
              </Typography>
            </div>

            <div>
              <Link to="/">
                <button className="btn"><i className="fa fa-home"></i>WebChat</button>
              </Link>
            </div>
        </Card>

        <Card className="formacontrooutside">
          <form className="customform" onSubmit={this.handleSubmit}>
            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="email"
             label="Email Address-example:john@gmail.com"
             name="email"
             autoComplete="email"
             autoFocus
             onChange={this.handleChange}
             value={this.state.email}
            />
              
            <div>
              <p style={{color:"grey", fontSize:"15px", marginLeft: "0"}}>Password: length greater than 6 (alphabet, number, special character)</p>
            </div>

            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="password"
             label="Password"
             name="password"
             type="password"
             autoComplete="current-password"
             autoFocus
             onChange={this.handleChange}
             value={this.state.password}
            />

            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="name"
             label="Your Name"
             name="name"
             autoComplete="name"
             autoFocus
             onChange={this.handleChange}
             value={this.state.name}
            />

            <div>
              <p style={{color:"grey", fontSize:"15px"}}>Please fill all fields and password should be greater than 6</p>
            </div>

            <div className="CenterAliningItems">
              <button className="customhandlefile" type="submit">
                <span>Sign Up</span>
              </button>
            </div>

            <div>
              <p style={{color: "grey"}}>Already have an account?</p>
              <Link to="/login">Login</Link>
            </div>

            <div className="error">
              <p id="1" style={{color: "red"}}></p>
            </div>

            
          </form>
        </Card>
      </div>
    )
  }
}

export default Signup
