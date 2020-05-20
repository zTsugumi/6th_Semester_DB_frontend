import React from 'react';
import { Link } from 'react-router-dom';
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled footer--link-list">
                            <li><Link className="footer--link-item" to="/welcome">Home</Link></li>
                            <li><Link className="footer--link-item" to="/about">About</Link></li>
                            <li><Link className="footer--link-item" to="/menu">Menu</Link></li>
                            <li><Link className="footer--link-item" to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address>
                            Something, Moscow<br />
                            <i className="fa fa-phone fa-lg"></i>  +792 1234 5678<br />
                            <i className="fa fa-envelope fa-lg"></i> <a className="footer--link-item" href="mailto:quinx@food.net">
                                quinx@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-instagram" href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
                            <a className="btn btn-social-icon" href="mailto:quinx@food.net"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2020 Quinx</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;