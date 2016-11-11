import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import Axios from 'axios';
import User from '../User/User';
import Timeline from '../Timeline/Timeline';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: JSON.parse(localStorage.getItem('userName')) || "Life in Dots",
      avatar: JSON.parse(localStorage.getItem('userAvatar')) || "/default-user.jpg",
      posts: JSON.parse(localStorage.getItem('posts')) || []
    };
    this.handleFacebookLogIn = this.handleFacebookLogIn.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
  }

  getAllPosts (id, token) {
    return new Promise((resolve, reject) => {
      var apiURL = "https://graph.facebook.com/"+ id +"/posts?access_token="+ token +"&limit=100";
      let postsArr = [];
      function recursiveAPICall(apiURL) {
        Axios
          .get(apiURL)
          .then(function(results) {
            if (results && results.data) {
              postsArr = postsArr.concat(results.data.data);
              if (results.data.paging && results.data.paging.next) {
                recursiveAPICall(results.data.paging.next);
              } else {
                resolve(postsArr);
              }
              // resolve(postsArr);
            } else {
              reject();
            }
          });
      }
      recursiveAPICall(apiURL);
    })
  }

  handleFacebookLogIn (user) {
    let _this = this;
    localStorage.setItem('userName', JSON.stringify(user.name));
    localStorage.setItem('userAvatar', JSON.stringify(user.picture.data.url));
    _this.setState({
      isLoading: true,
      name: user.name,
      avatar: user.picture.data.url
    });
    this.getAllPosts(user.id, user.accessToken).then(response => {
      localStorage.setItem('posts', JSON.stringify(response));
      _this.setState({
        isLoading: false,
        posts: response
      });
      // console.log(response);
    }).catch(e => {
      // console.log(e);
    });
  }

  render() {
    return (
      <div>
        <div className={this.state.isLoading ? "loader loader-default is-active" : ""} data-text="Loading data. Wait a minute."></div>
        <div className="ph3 ph0-ns">
          <div className="pv3 pb6-ns tc">
            <div className="bg-white-90 relative fixed-ns left-0 right-0 top-2-ns mw-100 mw6-m mw5-l center pv3 ph2 mb2 tc z-1 br2">
              <User name={this.state.name} avatar={this.state.avatar} count={this.state.posts.length} />
              { this.state.posts.length === 0 &&
                <FacebookLogin
                  appId="1611672629135041"
                  size="small"
                  scope="user_posts"
                  fields="name,email,picture.type(large)"
                  autoLoad={false}
                  callback={this.handleFacebookLogIn} />
              }
            </div>
            <Timeline posts={this.state.posts} />
          </div>
          <header className="cf relative bottom-0 fixed-ns w-100 left-0-ns bottom-0-ns right-0-ns bg-white tc tl-l ph3 pv2 z-2">
            <div className="dib">
              <div className="mv2">
                <span className="v-top db dib-ns mv2 mv0-ns">Share the project</span>
                <div className="fb-share-button dib v-top mh3" data-href="http://lifeindots.info/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flifeindots.info%2F&amp;src=sdkpreparse">Compartir</a></div>
                <a href="https://twitter.com/share" className="twitter-share-button dib v-base mh3" data-url="http://lifeindots.info/" data-via="ricardoerl" data-related="ricardoerl">Tweet</a>
              </div>
              <p className="mv2">Developed by <a href="http://ricardoerl.com" className="link pv1 pv0-l orange" target="_blank">Ricardo Ramírez</a></p>
            </div>
            <div className="fn fr-l tc tr-l">
                <p className="fw3 mv2 light-silver">This app doesn't store or publish anything on your profile.</p>
                <p className="fw3 mv2"><a href="https://www.facebook.com/settings?tab=applications" className="light-silver underline" target="_blank">Revoke access here</a></p>
            </div>
          </header>
        </div>

      </div>
    );
  }

}

export default App;
