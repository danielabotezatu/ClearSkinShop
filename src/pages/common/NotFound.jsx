import React from 'react';
import './404.css';

function NotFound(props) {
  React.useEffect(() => {
    var container = document.getElementById('errorcontainer');
    window.onmousemove = function (e) {
      var x = -e.clientX / 5,
        y = -e.clientY / 5;
      container.style.backgroundPositionX = x + 'px';
      container.style.backgroundPositionY = y + 'px';
    };

    return () => (window.onmousemove = () => {});
  }, []);

  return (
    <div>
      <div id='errorcontainer'>
        <div className='errorcontent'>
          <h2 style={{ color: 'white' }}>404</h2>
          <h4 style={{ color: 'white' }}>Oops! Page not found!</h4>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
