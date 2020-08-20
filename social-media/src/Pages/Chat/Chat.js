import React, { Component } from 'react';
import LoginString from '../Login/LoginStrings';
import firebase from '../../Services/Firebase';
import ReactLoading from 'react-loading';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
        isOpenDialogConfirmLogout: false,
        currentPeerUser: null,
        diplayedContactSwitchedNotification: [],
        displayContacts: []
      }
      this.currentUserName = localStorage.getItem(LoginString.Name)
      this.currentUserId = localStorage.getItem(LoginString.ID)
      this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);
      this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentId);

      this.currentUserMessages=[]
      this.searchUsers = []
      this.notificationMessagesErase = []
      this.onProfileClick= this.onProfileClick.bind(this);
      this.getListUser= this.getListUser.bind(this);
      this.renderListUser= this.renderListUser.bind(this);
      this.getClassNameforUserandNotification= this.getClassNameforUserandNotification.bind(this);
      this.notificationErase = this.notificationErase.bind(this);
      this.updaterenderList = this.updaterenderList(this);
      
  } 

  logout = () => {
    firebase.auth().signOut()
    this.props.history.push("/")
    localStorage.clear()
  }

  onProfileClick = () => {
    this.props.history.push('/profile')
  }

  componentDidMount() {
    firebase.firestore().collection('users').doc(this.currentUserDocumentId).get()
    .then((doc) => {
      doc.data().messages.map((item) => {
        this.currentUserMessages.push({
          notificationId: item.notificationId,
          number: item.number
        })
      })
      this.setState({
        displayedContactSwitchedNotification:this.currentUserMessages
      })
    })
    this.getListUser()
  }

  getListUser = () => {
    const result = firebase.firestore().collection('users').get();
    if(result.docs.length > 0){
      let listUsers = []
      listUsers = [...result.docs]
      listUsers.forEach((item, index) => {
        this.searchUsers.push(
          {
            key: index,
            documentKey: item.id,
            id: item.data().id,
            name: item.data().name,
            messages: item.data().messages,
            URL: item.data().URL, 
            description: item.data().description
          }
        )
      })
      this.setState({
        isLoading: false
      })
    }
    this.renderListUser()
  }
  getClassNameforUserandNotification = (itemId) => {
    let number = 0
    let className = ""
    let check = false;
    if(this.state.currentPeerUser &&
        this.currentPeerUser.id === itemId){
          className= "viewWrapItemFocused"
        }else {
          this.state.displayedContactSwitchedNotification.forEach((item)=> {
            if(item.notificationId.length > 0){
              if(item.notificationId === itemId){
                check = true
                number = item.number
              }
            }
          })
          if(check === true){
            className = "viewWrapItemNotification"
          }
          else{
            className = "viewWrapItem"
          }
        }
        return className
  }
  notificationErase = (itemId)=>{
    this.state.displayedContactSwitchedNotification.forEach((el)=> {
      if(el.notificationId.length > 0){
        if(el.notificationId != itemId){
          this.notificationMessagesErase.push(
            {
              notificationId: el.notificationId,
              number: el.number
            }
          )
        }
      }
    })
    this.updaterenderList()
  }
  updaterenderList = ()=>{
    firebase.firestore().collection("users").doc(this.currentUserDocumentId).update(
      {messages: this.notificationMessagesErase}
    )
    this.setState({
      displayedContactSwitchedNotification: this.notificationMessagesErase
    })
  }

  renderListUser= () => {
    if(this.searchUsers.length > 0){
      let  viewListUser = []
      let className = ""
      this.searchUsers.map((item) => {
        if(item.id != this.currentUserId
          ){
            className = this.getClassNameforUserandNotification(item.id)
            viewListUser.push(
              <button
              id={item.key}
              className = {className}
              onClick = {()=>{
                this.notificationErase(item.id)
                this.setState({currentPeerUser: item})
                document.getElementById(item.key).style.backgroundColor = "#fff"
                document.getElementById(item.key).style.color = "#fff"
              }}
              >
                <img
                className="viewAvatarItem"
                src= {item.URL}
                alt=""
                />
                <div className="viewWrapContentItem">
                  <span className="textItem">
                    {`Name: ${item.name}`}
                  </span>
                </div>
                {className === "viewWrapItemNotification" ?
                <div className="notificationpragraph">
                  <p id={item.key} className="newMessage">New messages</p>
                </div> :  null}
              </button>
            )
          }
      })
      this.setState({
        displayContacts: viewListUser
      })
    } else {
      console.log("No user is present")
    }
  } 
  
  render() {
    return (
      <div className="root">
        <div className="body">
          <div className="viewListUser">
            <div className="profileviewleftside">
              <img
              className="profilePicture"
              alt=""
              src={this.currentUserPhoto}
              onClick={this.onProfileClick}
              />
              <button className="Logout" onClick={this.logout}></button>
            </div>
            {this.state.displayContacts}
          </div>
        </div>
      </div>
    )
  }
}

export default Chat
