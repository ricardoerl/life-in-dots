import React, { Component } from 'react';

class Timeline extends Component {
  render() {
    return (
      <div>
        {this.props.posts.map(function(post) {
          return (
            <div key={post.id} className="dib">
              <a href={"https://facebook.com/" + post.id} className="db pa1" target="_blank" rel="noopener">
                <svg viewBox="0 0 120 120" className="pa1 grow" width="16" height="16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <circle fill={post.story ? "#FF6300" : "#FFB700"} cx="60" cy="60" r="50"/>
                </svg>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Timeline;
