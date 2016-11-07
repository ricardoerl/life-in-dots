import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div className="bg-white-90 fixed left-0 right-0 top-2-ns mw5 center pa1 mb2 tc z-1">
        <img src={this.props.avatar} className="br-100" width="100" height="100" alt="{this.props.name}"/>
        <h1 className="f4 mv2">{this.props.name}</h1>
        {this.props.count > 0 ? (
          <p>You have made {this.props.count} publications since you created your Facebook account.</p>
        ) : (
          <p>Please log in.</p>
        )}

      </div>
    );
  }
}

export default User;
