import React from 'react';

function Header() {
    return (
        <React.Fragment>
            <div id="profile-picture" className="col-12 col-md-6">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHXCzBqH-qb02GHWpaEFTTa6JSOORQQyUOFNTEOR7tONK8smY"
                     className="rounded-circle center" alt="Profile picture" />
            </div>
            <div id="header-content" className="col-8 col-md-6">
                <div className="row">
                    <div className="col-12">
                        <h1>MARTYNAS KASPARAVIČIUS</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="social">
                            <li>
                                <i className="fas fa-phone"></i>&nbsp; +370 631 69 663
                            </li>
                            <li>
                                <i className="fas fa-envelope"></i>&nbsp; martis.kasparavicius@gmail.com
                            </li>
                            <li>
                                <i className="fab fa-linkedin"></i>&nbsp; linkedin.com/in/martynaskaspa
                            </li>
                            <li>
                                <i className="fab fa-github"></i>&nbsp; github.com/MartynasKaspa
                            </li>
                            <li>
                                <i className="fas fa-home"></i>&nbsp; Kaunas, Lietuva
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;