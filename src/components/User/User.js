import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div className="bg-white-90 relative fixed-ns left-0 right-0 top-2-ns mw-100 mw6-m mw5-l center pv1 ph2 mb2 tc z-1 br2">
        <img src={this.props.avatar} className="br-100" width="100" height="100" alt={this.props.name}/>
        <h1 className="f4 mv2">{this.props.name}</h1>
        {this.props.count > 0 ? (
          <div className="f6 f5-ns">
            <p>You have made {this.props.count} publications since you created your Facebook account.</p>
            <p>Each point represents every time you posted something on Facebook. (Click on any one!)</p>
            <p className="f6 tl">
              <svg viewBox="0 0 120 120" className="pa1 dib v-mid" width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle fill="#FFB700" cx="60" cy="60" r="50"/>
              </svg>
              Status updates.
            </p>
            <p className="f6 tl">
              <svg viewBox="0 0 120 120" className="pa1 dib v-mid" width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle fill="#FF6300" cx="60" cy="60" r="50"/>
              </svg>
              Links, videos, etc.
            </p>
            <p>Scroll and have fun!</p>
          </div>
        ) : (
          <div>
            <p>This tool lets you know how many times you have posted something on Facebook.</p>
            <p>Please log in.</p>
          </div>
        )}

      </div>
    );
  }
}

export default User;
