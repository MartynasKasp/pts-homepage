import React from 'react';

function Header() {
    return (
        <React.Fragment>
            <div className="col-12 col-lg-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIHXCzBqH-qb02GHWpaEFTTa6JSOORQQyUOFNTEOR7tONK8smY"
                     className="rounded-circle" alt="Profile picture" />
            </div>
            <div className="col-12 col-lg-9">
                <div className="row">
                    <div className="col-12">
                        <h1> MARTYNAS KASPARAVIČIUS</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="social">
                            <li>
                                <i className="fas fa-phone"></i> +3706 31 69 663
                            </li>
                            <li>
                                <i className="fas fa-envelope"></i> martis.kasparavicius@gmail.com
                            </li>
                            <li>
                                <i className="fab fa-linkedin"></i> linkedin.com/in/martynaskaspa
                            </li>
                            <li>
                                <i className="fab fa-github"></i> github.com/MartynasKaspa
                            </li>
                            <li>
                                <i className="fas fa-home"></i> Kaunas, Lietuva
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;