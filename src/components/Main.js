import React, { useEffect } from 'react';
import useSticky from '../hooks/useSticky.js';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Welcome from './Welcome/Welcome';
import Home from './Home/Home';
import About from './About/About';
import Menu from './Menu/Menu';
import DishDetail from './Menu/Dishdetail';
import Reservation from './Reservation/Reservation';
import Profile from './Profile/Profile';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from 'react-redux-form';
import Util from './Alert/Util';
import AllActions from '../redux/actions/AllActions';


function Main() {
    const { isSticky, element } = useSticky();

    // Store states
    const auth = useSelector(state => state.auth);
    const dishes = useSelector(state => state.dishes);
    const staffs = useSelector(state => state.staffs);
    const comments = useSelector(state => state.comments);
    const favorites = useSelector(state => state.favorites);
    const reservations = useSelector(state => state.reservations);

    const dispatch = useDispatch();

    // Reducers
    const loginUser = (creds) => dispatch(AllActions.AuthActions.loginUser(creds));
    const logoutUser = () => dispatch(AllActions.AuthActions.logoutUser());
    const signupUser = (creds) => dispatch(AllActions.AuthActions.signupUser(creds));

    const postComments = (newComment) => dispatch(AllActions.CommentActions.postComments(newComment));

    const postReservations = (newreservation) => dispatch(AllActions.ReservationActions.postReservations(newreservation));
    const resetReservationForm = () => dispatch(actions.reset('reservation'));

    const postFavorite = (dishId) => dispatch(AllActions.FavoriteActions.postFavorite(dishId));
    const deleteFavorite = (dishId) => dispatch(AllActions.FavoriteActions.deleteFavorite(dishId));

    // Hook effect every render
    useEffect(() => {
        dispatch(AllActions.DishActions.fetchDishes());
        dispatch(AllActions.CommentActions.fetchComments());
        dispatch(AllActions.StaffActions.fetchStaffs());
        dispatch(AllActions.ReservationActions.fetchReservations());
        dispatch(AllActions.FavoriteActions.fetchFavorites());
    }, [dispatch])

    const HomePage = () => {
        const dishFeature = dishes.dishes.filter((dish) => dish.featured)[0];

        return (
            <>
                <Welcome element={element} />
                <Home dish={dishFeature}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess} />
            </>
        )
    }

    const AboutPage = () => {
        return (
            <>
                <Welcome element={element} />
                <About staffs={staffs} />
            </>
        )
    }

    const MenuPage = () => {
        return (
            <>
                <Welcome element={element} />
                <Menu dishes={dishes} />
            </>
        )
    }

    const DishWithId = ({ match }) => {
        const dishSeletected = dishes.dishes.filter((dish) => dish._id === match.params.dishId)[0];
        const commentsSelected = comments.comments.filter((comment) => comment.dish === match.params.dishId);
        const favoriteDish = (favorites.favorites === null)
            ? false
            : favorites.favorites.dishes.some((dish) => dish._id === match.params.dishId)

        return (
            <>
                <Welcome element={element} />
                <DishDetail dish={dishSeletected}
                    isLoading={dishes.isLoading}
                    errMess={dishes.errMess}
                    comments={commentsSelected}
                    commentsLoading={comments.isLoading}
                    commentsErrMess={comments.errMess}
                    postComments={postComments}
                    favorite={favoriteDish}
                    postFavorite={postFavorite}
                    deleteFavorite={deleteFavorite}
                />
            </>
        );
    }

    const ReservationPage = () => {
        return (
            <>
                <Welcome element={element} />
                <Reservation auth={auth} postReservations={postReservations}
                    resetReservationForm={resetReservationForm} />
            </>
        )
    }

    const ProfilePage = ({ type = auth.isAdmin ? 'admin-menu' : 'favorite' }) => {
        return (
            <>
                <Welcome element={element} />
                {auth.isAdmin
                    ?
                    <Profile auth={auth} type={type} />
                    :
                    <Profile auth={auth} type={type}
                        favorites={favorites} deleteFavorite={deleteFavorite}
                        reservations={reservations} />
                }

            </>
        )
    }

    const PrivateRoute = ({ component: Component, ...rest }) => {
        if (!auth.isAuthenticated)
            Util.alert(false, 'You need to login to use this feature', false);
        return (
            <Route {...rest} render={(props) => (
                auth.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/welcome',
                        state: { from: props.location }
                    }} />
            )}
            />
        );
    }

    // ?? Sticky animation is still a little bit buggy, Navbar need more modification ??
    // ?? Can add sticky to footer
    // ?? Animation rerender problem
    // ?? Can change welcome image for different subpages
    // ?? Should style subpages with material-ui
    // ?? Need to add location map to the end of Welcome page
    // ?? Need to fix alert box for reservation make page go bake to top
    // ?? Need to add edit comment
    return (
        <div>
            <Header sticky={isSticky} auth={auth}
                loginUser={loginUser} logoutUser={logoutUser} signupUser={signupUser} />
            <Switch>
                <Route path="/welcome" component={HomePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/menu" component={MenuPage} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <PrivateRoute exact path="/reservation" component={ReservationPage} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute path="/profile/favorite" component={() => <ProfilePage type="favorite" />} />
                <PrivateRoute path="/profile/reservation" component={() => <ProfilePage type="reservation" />} />
                <PrivateRoute path="/profile/admin/menu" component={() => <ProfilePage type="admin-menu" />} />
                <PrivateRoute path="/profile/admin/staff" component={() => <ProfilePage type="admin-staff" />} />
                <PrivateRoute path="/profile/admin/reservation" component={() => <ProfilePage type="admin-reservation" />} />
                <Redirect to="/welcome" />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(Main);