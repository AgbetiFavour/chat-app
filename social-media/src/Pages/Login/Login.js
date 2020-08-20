import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Services/Firebase';
import LoginString from './LoginStrings';
import './Login.css';
import { Card } from 'react-bootstrap';
import { Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const paper = {
    //margin: makeStyles.theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px'
}

const rightcomponent = {
    boxShadow: '0 80px 80px #808888',
    backgroundColor: 'smokegrey',
} 

const root = {
    height: '100vh',
    background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)',
    marginBottom: '50px'
}

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

  const form = {
      width : '100%',
      marginTop: '50px'
  }

  const avatar = {
      backgroundColor: 'green'
  }


class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          isLoading: true,
          error: "",
          email: "",
          password: ""
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount(){
      if(localStorage.getItem(LoginString.ID)) {
          this.setState({isLoading: false}, () => {
              this.setState({isLoading: false})
              this.props.showToast(1, "Login success")
              this.props.history.push('/chat')
          })
      } else {
          this.setState({isLoading: false})
      }
  }

handleSubmit(event){
      event.preventDefault();
      this.setState({error: ""});

      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(result => {
          let  user = result.user;
          if(user){
               firebase.firestore().collection("users")
              .where("id", "==", user.uid)
              .get()
              .then(function(querySnapshot){
                  querySnapshot.forEach(function(doc){
                      const currentData = doc.data();
                      localStorage.setItem(LoginString.FirebaseDocumentId, doc.id)
                      localStorage.setItem(LoginString.ID, currentData.id)
                      localStorage.setItem(LoginString.Name, currentData.name)
                      localStorage.setItem(LoginString.Email, currentData.email)
                      localStorage.setItem(LoginString.Password, currentData.password)
                      (LoginString.PhotoURL, currentData.URL)
                      (LoginString.Description, currentData.description)
                  })
                })

          }

          this.props.history.push("/chat")
      }).catch(function(error){
        this.setState({
            error: "Error while signing in please try again"
        })
      })
  }

  render() {
    return (
      <Grid container component="main" style={root}>
        <CssBaseline/>
        <Grid item xs={1} sm={4} md={7} className="image">
            <div className="image1"></div>
        </Grid>

        <Grid itemxs={12} sm={8} md={5} style={rightcomponent} elevation={6} square>
            <Card style={Signinsee}>
                <div>
                    <Avatar style={avatar}>
                        <LockOutlinedIcon width="50px" height="50px"/>
                    </Avatar>
                </div>

                <div>
                    <Typography component="h1"
                    variant="h5">
                        Sign in 
                        To
                    </Typography>
                </div>

                <div>
                    <Link to="/">
                        <button className="btn">
                            <i className="fa fa-home"></i>
                            WebChat
                        </button>
                    </Link>
                </div>
            </Card>

            <div style={paper}>
                <form style={form} onSubmit={this.handleSubmit}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleChange}
                        value={this.state.email}
                        />

                        
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    onChange={this.handleChange}
                    value={this.state.password}
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember Me"
                    />
                    <Typography component="h6" variant="h5">
                        {this.state.error ?(
                            <p className="text-danger">{this.state.error}</p>
                        ):null}
                    </Typography>

                    <div className="CenterAliningItems">
                        <button className="button1" type="Submit">
                            <span>Login In</span>
                        </button>
                    </div>

                    <div className="CenterAliningItems">
                        <p>Don't have an account? </p>
                        <Link to="/signup" variant="body2">
                            Sign Up
                        </Link>
                    </div>
                
                </form>
            </div>
        </Grid>
      </Grid>
    )
  }
}

export default Login
