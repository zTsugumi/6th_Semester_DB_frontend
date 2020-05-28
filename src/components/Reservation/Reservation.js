import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import ReservationForm from './ReservationForm';
import './Reservation.css';

const Reservation = (props) => {
    if (!props.auth.isAuthenticated)
        return (null);
    else return (
        <FadeIn>
            <div className="container reservation--container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/welcome">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Reservation</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Reservation</h3>
                        <hr />
                    </div>
                    <div className="col-12 col-md-4">
                        <p>For parties of six or more, we recommend making reservations at least two weeks in advance.
                            For walk-ins, we only seat parties on a first come, first served basis.</p>
                    </div>
                    <div className="col-12 col-md-8">
                        <ReservationForm postReservations={props.postReservations}
                            resetReservationForm={props.resetReservationForm} />
                    </div>
                </div>
            </div>
        </FadeIn >
    );
}

export default Reservation;