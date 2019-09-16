import React from 'react';

function Header() {
    return (
        <React.Fragment>
            <div id="profile-picture" className="col-12 col-md-5">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHXCzBqH-qb02GHWpaEFTTa6JSOORQQyUOFNTEOR7tONK8smY"
                     className="rounded-circle" alt="Profile picture" />
            </div>
            <div id="header-content" className="col-8 col-md-7">
                <div className="row">
                    <div className="col-12">
                        <h1>MARTYNAS KASPARAVIČIUS</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="social">
                            <li>
                                <i className="fas fa-phone"></i>&nbsp; <a href="#">+370 631 69 663</a>
                            </li>
                            <li>
                                <i className="fas fa-envelope"></i>&nbsp; <a href="#">martis.kasparavicius@gmail.com</a>
                            </li>
                            <li>
                                <i className="fab fa-linkedin"></i>&nbsp; <a href="#">linkedin.com/in/martynaskaspa</a>
                            </li>
                            <li>
                                <i className="fab fa-github"></i>&nbsp; <a href="#">github.com/MartynasKaspa</a>
                            </li>
                            <li>
                                <i className="fas fa-home"></i>&nbsp; <a href="#">Kaunas, Lietuva</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;