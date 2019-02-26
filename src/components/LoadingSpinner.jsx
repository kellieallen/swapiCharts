import React from 'react';

class LoadingSpinner extends React.PureComponent {
  render() {
    return (
      <div className="loading-spinner-container">
        <svg
          className="loading-spinner-circle"
          width="40"
          height="40"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="15" />
        </svg>
      </div>
    );
  }
}

export default LoadingSpinner;
