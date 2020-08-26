import React from 'react';
import './TopBar.scss';
import IcecreamLogo from  '../../assets/images/lzblogo.png';

function TopBar() {
  return (
    <header className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="topbar__wrap">
              <div className="topbar__logo">
                <img src={IcecreamLogo} alt="Lody" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar
