import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { baseUrl } from '../../shared/baseUrl';
import FadeIn from 'react-fade-in';
import './Menu.css';

function RenderMenuItem({ dish }) {
    return (
        <Media>
            {/* ``: whatever is inside that is JS will be evaluated and be replaced by that */}
            <Media left middle>
                <Link to={`/menu/${dish._id}`}>
                    <Media object src={baseUrl + dish.image} width="50" alt={dish.name} />
                </Link>
            </Media>
            <Media body className="d-none d-sm-block ml-3">
                <Media heading>
                    {dish.name}
                </Media>
                <p>{dish.description}</p>
            </Media>
        </Media >
    );
}

const MenuSection = ({ dishes, type }) => {
    const item = dishes.map((dish) => {
        if (dish.category === type)
            return (
                <div key={dish._id} className="col-12 col-lg-6">
                    <RenderMenuItem dish={dish} />
                </div>
            )
        else
            return null;
    });

    return (
        <>
            {item}
        </>
    );
}

const Menu = (props) => {
    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <FadeIn>
                <div className="container menu--container" >
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>Breakfast — Served daily from 7 – 11 am.</h3>
                            <hr />
                        </div>
                        <MenuSection dishes={props.dishes.dishes} type={"breakfast"} />
                    </div>
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>Lunch — Served daily from 12 – 4 pm.</h3>
                            <hr />
                        </div>
                        <MenuSection dishes={props.dishes.dishes} type={"lunch"} />
                    </div>
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>Dinner — Served daily from 6 till close.</h3>
                            <hr />
                        </div>
                        <MenuSection dishes={props.dishes.dishes} type={"dinner"} />
                    </div>
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>Drinks — Served all day.</h3>
                            <hr />
                        </div>
                        <MenuSection dishes={props.dishes.dishes} type={"drink"} />
                    </div>
                </div>
            </FadeIn>
        );
}

export default Menu;