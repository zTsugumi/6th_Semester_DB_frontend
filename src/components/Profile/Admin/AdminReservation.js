import React, { useState } from 'react';
import { Media, Button } from 'reactstrap';
import { Loading } from '../../Loading/Loading';
import FadeIn from 'react-fade-in';
import { EditModal, DeleteModal } from './AdminReservationModal';
import './AdminReservation.css';

function RenderReservation({ resId1, item, putReservation, deleteReservation }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

    return (
        <>
            <div className="container admin-reservation-container">
                <div className="row">
                    <div className="ml-2 col-3">
                        <p>Date: </p>
                    </div>
                    <div className="col-8">
                        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(item.date)))}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ml-2 col-3">
                        <p>Agree: </p>
                    </div>
                    <div className="col-8">
                        <p>{item.agree}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ml-2 col-3">
                        <p>Contact Type: </p>
                    </div>
                    <div className="col-8">
                        <p>{item.contactType}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ml-2 col-3">
                        <p>Email: </p>
                    </div>
                    <div className="col-8">
                        <p>{item.email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ml-2 col-3">
                        <p>Message: </p>
                    </div>
                    <div className="col-8">
                        <p>{item.message}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ml-2 col-3">
                        <p>N. Guest: </p>
                    </div>
                    <div className="col-8">
                        <p>{item.nGuest}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="ml-2 col-3">
                        <p>Tel.: </p>
                    </div>
                    <div className="col-8">
                        <p>{item.telnum}</p>
                    </div>
                </div>
                <Button onClick={toggleEditModal}>Edit</Button>
                <Button onClick={toggleDeleteModal}>Remove</Button>
            </div>
            <EditModal isModalOpen={isEditModalOpen} toggleModal={toggleEditModal}
                resId1={resId1} resId2={item._id}
                putReservation={putReservation} type="edit" />
            <DeleteModal isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal}
                resId1={resId1} resId2={item._id}
                deleteReservation={deleteReservation} type="one" />
        </>
    )
}

function RenderReservations({ reservation, putReservation, deleteReservation }) {
    return (
        <>
            <Media tag="li">
                <Media body>
                    <Media heading>
                        {reservation.user.firstname} {reservation.user.lastname}
                    </Media>
                    <div className="row">
                        <div className="col-2">
                            <p><strong>Username: </strong></p>
                        </div>
                        <div className="col-10">
                            <p>{reservation.user.username}</p>
                        </div>
                    </div>
                    {reservation.reservations.map(item => {
                        return (
                            <div key={reservation._id} className="col-12">
                                <RenderReservation resId1={reservation._id} item={item}
                                    putReservation={putReservation} deleteReservation={deleteReservation} />
                            </div>
                        )
                    })}
                </Media>
            </Media>
        </>
    );
}

const AdminReservation = (props) => {
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const togglePostModal = () => setPostModalOpen(!isPostModalOpen);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const toggleDeleteModal = () => setDeleteModalOpen(!isDeleteModalOpen);

    if (props.reservations.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.reservations.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.reservations.errMess}</h4>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
                <FadeIn>
                    <div className="container" >
                        <div className="row mb-5">
                            <Button className="ml-1 col-3" onClick={toggleDeleteModal}>Delete Reservations</Button>
                        </div>
                        <div className="row">
                            {props.reservations.reservations.map((reservation) => {
                                return (
                                    <div key={reservation._id} className="col-12">
                                        <RenderReservations reservation={reservation}
                                            putReservation={props.putReservation}
                                            deleteReservation={props.deleteReservation} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </FadeIn>
                <EditModal isModalOpen={isPostModalOpen} toggleModal={togglePostModal}
                    postReservations={props.postReservations} type="post" />
                <DeleteModal isModalOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal}
                    deleteReservations={props.deleteReservations} type="all" />
            </>
        );
    }
}

export default AdminReservation;