import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, Input } from 'reactstrap';
import Util from '../../Alert/Util';

class EditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactType: null
        }

        this.handleContactType = this.handleContactType.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    handleContactType(event) {
        this.setState({ contactType: event.target.value });
        event.preventDefault();
    }

    handleEditSubmit(event) {
        this.props.toggleModal();

        var updateInfo = {}
        if (this.telnum.value) updateInfo.telnum = this.telnum.value;
        if (this.email.value) updateInfo.email = this.email.value;
        if (this.date.value) updateInfo.date = `${this.year.value}-${this.month.value}-${this.date.value}`;
        if (this.nGuest.value) updateInfo.nGuest = this.nGuest.value;
        if (this.message.value) updateInfo.message = this.message.value;
        if (this.state.contactType) updateInfo.contactType = this.state.contactType;

        this.props.putReservation(this.props.resId1, this.props.resId2, updateInfo)
            .then(
                (response) => {
                    if (response.type === 'PUT_RESERVATION_FAILED')
                        Util.alert(false, 'PUT Failed');
                    else Util.alert(true, 'PUT Successful');
                }
            )

        event.preventDefault();
    }

    render() {
        return (
            <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                <ModalHeader toggle={this.props.toggleModal}>
                    <h5>Edit</h5>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleEditSubmit}>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="telnum">Tel. Num</Label>
                            <div className="col-9">
                                <Input type="text" id="telnum" name="telnum"
                                    innerRef={(input) => this.telnum = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="email">Email</Label>
                            <div className="col-9">
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="date month year">Date</Label>
                            <div className="col-3">
                                <Input type="text" id="date" name="date"
                                    placeholder="DD"
                                    innerRef={(input) => this.date = input} />
                            </div>
                            <div className="col-3">
                                <Input type="text" id="month" name="month"
                                    placeholder="MM"
                                    innerRef={(input) => this.month = input} />
                            </div>
                            <div className="col-3">
                                <Input type="text" id="year" name="year"
                                    placeholder="YYYY"
                                    innerRef={(input) => this.year = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="nGuest">N. Guest</Label>
                            <div className="col-9">
                                <Input type="text" id="nGuest" name="nGuest"
                                    innerRef={(input) => this.nGuest = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="message">Message</Label>
                            <div className="col-9">
                                <Input type="textarea" id="message" name="message" rows="5"
                                    innerRef={(input) => this.message = input} />
                            </div>
                        </FormGroup>
                        <FormGroup className="row">
                            <Label className="col-3 align-self-center" style={{ marginBottom: 0 }} htmlFor="contactType">Contact Type</Label>
                            <div className="col-9">
                                <Input type="select" id="contactType" name="contactType"
                                    onClick={this.handleContactType}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </Input>
                            </div>
                        </FormGroup>
                        <Button type="submit" value="submit">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal >
        )
    }
}

const DeleteModal = (props) => {
    const handleSubmit = () => {
        props.toggleModal();
        if (props.type === 'one')
            props.deleteReservation(props.resId1, props.resId2)
                .then(
                    response => {
                        if (response.type !== 'REMOVE_RESERVATION_FAILED')
                            Util.alert(true, "REMOVE Successful");
                        else
                            Util.alert(false, "REMOVE Failed");
                    }
                );
        else
            props.deleteReservations()
                .then(
                    response => {
                        if (response.type !== 'REMOVE_RESERVATIONS_FAILED')
                            Util.alert(true, "REMOVE Successful");
                        else
                            Util.alert(false, "REMOVE Failed");
                    }
                );
    }

    return (
        <Modal className="container" isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>
                {props.type === 'one' ? <h5>Remove Rervation</h5> : <h5>Remove All Reservations</h5>}
            </ModalHeader>
            <ModalBody className="row">
                {props.type === 'one'
                    ? <p className="col-12">Are you sure you want to delete this item?</p>
                    : <p className="col-12">Are you sure you want to delete all items?</p>
                }
                <Button className="col-3 ml-auto" onClick={handleSubmit}>OK</Button>
                <Button className="col-3 ml-2 mr-auto" onClick={props.toggleModal}>Cancel</Button>
            </ModalBody>
        </Modal >
    )
}

export {
    EditModal,
    DeleteModal
}
