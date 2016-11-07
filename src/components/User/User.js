import React, { Component } from 'react';

class User extends Component {
  render() {
    return (
      <div className="bg-white-90 relative fixed-l left-0 right-0 top-2-ns mw5 center pv1 ph3 mb2 tc z-1">
        <img src={this.props.avatar} className="br-100" width="100" height="100" alt="{this.props.name}"/>
        <h1 className="f4 mv2">{this.props.name}</h1>
        {this.props.count > 0 ? (
          <div>
            <p>You have made {this.props.count} publications since you created your Facebook account.</p>
            <p className>Each point represents every time you posted something on Facebook. (Click on any one!)</p>
            <p className>Scroll and have fun!</p>
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
