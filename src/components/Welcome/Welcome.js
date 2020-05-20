import React from "react";
import Logo from "../../assets/images/logo.png";
import Home from "../Welcome/Home";

import "./Welcome.css"

const Welcome = ({ element }) => {
    return (
        <>
            <section className="welcome">
                <div ref={element}>
                    <img src={Logo} alt="logo" className="welcome--logo" />
                    <p>Something here</p>
                </div>

            </section>
            <Home />
        </>
    )
}

export default Welcome