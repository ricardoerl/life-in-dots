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
      name: "Unknown User",
      avatar: "/default-user.jpg",
      posts: []
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
    _this.setState({
      isLoading: true,
      name: user.name,
      avatar: user.picture.data.url
    });
    this.getAllPosts(user.id, user.accessToken).then(response => {
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
        <header className="cf relative fixed-ns w-100 left-0-ns bottom-0-ns right-0-ns bg-white tc tl-l pa3 z-2">
          <div className="dib pv1">
            <h1 className="f4 mv0 ttu orange">Life in Dots</h1>
            <p className="mv2 gray">Know how many times you have posted something on Facebook.</p>
            <p className="mv0 dib">Developed by <a href="http://ricardoerl.com" className="link pv1 pv0-l orange mr0 mr3-l" target="_blank">Ricardo Ramírez</a><a href="https://medium.com/@ricardoerl/life-in-dots-107c3e59ffbe#.x0qla08ue" className="link pv1 pv0-l orange db dib-l" target="_blank">About the project &rarr;</a></p>
          </div>
          <div className="fn fr-l tc tr-l pv2">
            {this.state.posts.length === 0 &&
              <FacebookLogin
                appId="1611672629135041"
                size="small"
                scope="user_posts"
                fields="name,email,picture.type(large)"
                autoLoad={true}
                callback={this.handleFacebookLogIn} />
            }
              <p className="f6 fw3 mv2 light-silver">We do not store or publish anything on your profile.</p>
              <p className="f6 fw3 mv2"><a href="https://www.facebook.com/settings?tab=applications" className="light-silver underline" target="_blank">Revoke access here (search: Life in Dots)</a></p>
          </div>
        </header>
        <div>
          <div className="pa3 pb3 pb6-ns tc">
            <User name={this.state.name} avatar={this.state.avatar} count={this.state.posts.length} />
            <Timeline posts={this.state.posts} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
