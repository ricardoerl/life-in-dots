import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div>
        {this.props.avatar.length !== '/default-user.jpg' &&
        <img src={this.props.avatar} className="br-100" width="100" height="100" alt={this.props.name}/>
        }
        <h1 className="f4 mv2 ttu">{this.props.name}</h1>
        {this.props.count > 0 ? (
          <div className="f6 f5-ns">
            <p>You've made {this.props.count} publications since you created your Facebook account.</p>
            <p>Each dot in the background represents every time you posted something on Facebook. (Click on any one!)</p>
            <p className="f6">
              <svg viewBox="0 0 120 120" className="pa1 dib v-mid" width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle fill="#FFB700" cx="60" cy="60" r="50"/>
              </svg>
              &rarr; Status updates.
            </p>
            <p className="f6">
              <svg viewBox="0 0 120 120" className="pa1 dib v-mid" width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle fill="#FF6300" cx="60" cy="60" r="50"/>
              </svg>
              &rarr; Links, videos, etc.
            </p>
          </div>
        ) : (
          <div>
            <p className="f5 lh-title">Browse all your posts on Facebook through a beautiful collage made of dots.</p>
          </div>
        )}
      </div>
    );
  }
}

export default User;
