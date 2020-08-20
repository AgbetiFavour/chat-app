import React, { Component } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Images from '../../ProjectImages/ProjectImages';
import './Home.css';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
     <div>
        <Header/>
        <div className="splash-container">
           <div className="splash">
             <h1 className="splash-head">WEB CHAT APP</h1>
             <p className="splash-subhead">
                 Let's talk with our loved ones
             </p>

             <div className="custom-button-wrapper">
                 <Link to = "/login">
                 <a className="my-super-cool-btn">
                     <div className="dots-container">
                         <div className="dot"></div>
                         <div className="dot"></div>
                         <div className="dot"></div>
                         <div className="dot"></div>
                         <span className="buttoncooltext">Get started</span>
                     </div>
                 </a>
                 </Link>
             </div>
           </div>
        </div>

        {/* AppFeature */}

        <div className="content-wrapper">
          <div className="content">
            <h2 className="content-head">Features of WebChat Application</h2>

            <div className="Appfeatures">
              <div className="content-head">
                <h3 className="content-subhead">
                  <i className="fa fa-rocket"></i>
                  Get Started Quickly
                </h3>
                <p>Just register yourself with this app and start chatting with your loved ones</p>
              </div>

              <div className="l-box pure-u-l pure-u-md-1-2-pure-u-lg-1-4">
                <h3 className="content-subhead">
                  <i className="fa fa-sign-in"></i>
                  Firebase Authentication
                </h3>
                <p> Firebase Authentication has be implemented in this app</p>
              </div>

              <div className="l-box pure-u-l pure-u-md-1-2-pure-u-lg-1-4">
                <h3 className="content-subhead">
                  <i className="fa fa-th-large"></i>
                  Media
                </h3>
                <p>You can share images with images with your friends for better experience</p>
              </div>

              <div className="l-box pure-u-l pure-u-md-1-2-pure-u-lg-1-4">
              <h3 className="content-subhead">
                <i className="fa fa-refresh"></i>
                Updates
              </h3>
              <p>We will be working with new features for this app for better experience in the future</p>
              </div>
            </div>
          </div>

          {/* AppFeature Founder */}
          <div className="AppfeaturesFounder">
            <div className="l-box-lrg is-center pure-u-l pure-u-md-1-2 pure-u-lg-2-5">
              <img width="300" alt="file icon" className="pure-img-responsive" src={Images.ali}/>
            </div>

            <div className="pure-u-l pure-u-md-1-2 pure-u-lg-3-5">
              <h2 className="content-head content-head-ribbon">Agbeti Favour</h2>
              <p style={{color:"white"}}>The Founder of Coding Cafe.</p>
              <p style={{color:"white"}}>The Currently working at Coding Cafe and busy to explore new ideas with new technologies bing developed.</p>
            </div>
          </div>

          <div className="content">
            <h2 className="content-head">Who We Are</h2>
            <div className="Appfeatures">
              <div className="l-box-lrg pure-u-l pure-u-md-2-5">
                <form className="pure-form form-stacked">
                  <fieldset>
                    <label htmlFor="name">Your Name</label>
                    <input id="name" type="text" placeholder="Your Name"/>

                    <label htmlFor="email">Your Email</label>
                    <input id="email" type="text" placeholder="Your Email"/>

                    <label htmlFor="password">Your Password</label>
                    <input id="password" type="text" placeholder="Your Password"/>

                    <button type="submit" className="pure-button">Sign Up</button>
                  </fieldset>
                </form>
              </div>

              <div className="l-box-lrg pure-u-l pure-u-md-3-5">
                <h4>Contact Us</h4>
                <p>
                  For any question or suggestion you can directly contact us on your facebook account:
                  <a href="https://web.facebook.com/favour.agbeti.1">https://web.facebook.com/favour.agbeti.1</a>
                </p>
                <p>
                  Twitter: <a href="https://twitter.com/FavourAgbeti">https://twitter.com/FavourAgbeti</a>
                </p>
                <p>
                  Instagram: <a href="https://www.instagram.com/favouragbeti/?hl=en">https://www.instagram.com/favouragbeti/?hl=en</a>
                </p>

                <h4>More Information</h4>
                <p>To whom it may concern</p>
                <p>This App is developed for learning purpose - Developed by -Agbeti Favour</p>
              </div>
            </div>
          </div>

          <Footer/>

        </div>


     </div>
    )
  }
}

export default Home;
