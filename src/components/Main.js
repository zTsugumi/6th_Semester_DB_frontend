import React from 'react';
import useSticky from '../hooks/useSticky.js';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Welcome from './Welcome/Welcome';
import Menu from './Menu/Menu';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchDishes } from '../redux/actions/ActionCreators';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDishes: () => dispatch(fetchDishes())
    }
}

function Main(props) {
    const { isSticky, element } = useSticky();
    const WelcomePage = () => {
        return (
            <Welcome element={element} />
        )
    }

    const MenuPage = () => {
        return (
            <Menu />
        )
    }

    // ?? Sticky animation is still a little bit buggy, Navbar need more modification ??
    // ?? Can add sticky to footer, WIP
    return (
        <div>
            <Header sticky={isSticky} />
            <Switch>
                <Route path="/welcome" component={WelcomePage} />                                
                <Route exact path="/menu" component={MenuPage} />
                <Redirect to="/welcome" />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));