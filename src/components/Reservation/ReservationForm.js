import React from 'react';
import { Label, Button, Row, Col } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import Util from '../Alert/Util';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const isDate = (date) => (date >= 1 && date <= 31);
const isMonth = (month) => (month >= 1 && month <= 12);
const isYear = (year) => (year >= 2020)
const minGuest = (val) => val >= 1
const maxGuest = (val) => val <= 20
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

// ?? Need more exact date, month, year validation
// ?? Should split Form into other component
const ReservationForm = (props) => {
    const handleSubmit = (values) => {
        var reservation = {
            telnum: values.telnum,
            email: values.email,
            date: `${values.year}-${values.month}-${values.date}`,
            nGuest: values.nGuest,
            agree: values.agree === '' ? false : true,
            contactType: values.contactType,
            message: values.message
        }

        props.postReservations(reservation)
            .then(
                (response) => {
                    if (response.type === 'POST_RESERVATIONS_FAILED')
                        Util.alert(false, 'Please check if you already made a reservation on that date. Contact us for more information', false);
                    else
                        Util.alert(false, 'Reservation Successful. We are processing your reservation. Thank you.', false);
                }
            );
        props.resetReservationForm();
    }

    return (
        <Form model="reservation" onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                <Col md={10}>
                    <Control.text model=".telnum" id="telnum" name="telnum"
                        placeholder="Tel. number"
                        className="form-control"
                        validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                        }}
                    />
                    <Errors
                        className="text-danger" model=".telnum"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 numbers',
                            maxLength: 'Must be 15 numbers or less',
                            isNumber: 'Should contain only numbers'
                        }}
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="email" md={2}>Email</Label>
                <Col md={10}>
                    <Control.text model=".email" id="email" name="email"
                        placeholder="Email"
                        className="form-control"
                        validators={{
                            required, validEmail
                        }}
                    />
                    <Errors
                        className="text-danger" model=".email"
                        show="touched"
                        messages={{
                            required: 'Required',
                            validEmail: 'Invalid email'
                        }}
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="date" md={2}>Date</Label>
                <Col xs={3} md={2}>
                    <Control.text model=".month" id="month" name="month"
                        placeholder="MM"
                        className="form-control"
                        validators={{
                            required, isNumber, isMonth
                        }}
                    />
                    <Errors
                        className="text-danger" model=".month"
                        show="touched"
                        messages={{
                            required: 'Required',
                            isNumber: 'Should contain only numbers',
                            isMonth: 'Invalid month'
                        }}
                    />
                </Col>
                <Col xs={3} md={2}>
                    <Control.text model=".date" id="date" name="date"
                        placeholder="DD"
                        className="form-control"
                        validators={{
                            required, isNumber, isDate
                        }}
                    />
                    <Errors
                        className="text-danger" model=".date"
                        show="touched"
                        messages={{
                            required: 'Required',
                            isNumber: 'Should contain only numbers',
                            isDate: 'Invalid date'
                        }}
                    />
                </Col>
                <Col xs={6} md={2}>
                    <Control.text model=".year" id="year" name="year"
                        placeholder="YYYY"
                        className="form-control"
                        validators={{
                            required, isNumber, isYear
                        }}
                    />
                    <Errors
                        className="text-danger" model=".year"
                        show="touched"
                        messages={{
                            required: 'Required',
                            isNumber: 'Should contain only numbers',
                            isYear: 'Year invalid'
                        }}
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="nGuest" md={2}>N. Guest</Label>
                <Col md={10}>
                    <Control.text model=".nGuest" id="nGuest" name="nGuest"
                        placeholder="Number of guests"
                        className="form-control"
                        validators={{
                            required, isNumber, minGuest, maxGuest
                        }}
                    />
                    <Errors
                        className="text-danger" model=".nGuest"
                        show="touched"
                        messages={{
                            required: 'Required',
                            isNumber: 'Invalid number',
                            minGuest: 'There should be at least 1 guest',
                            maxGuest: 'We can only handle upto 20 guests. Sorry for the inconvenience'
                        }}
                    />
                </Col>
            </Row>
            <Row className="form-group">
                {/* The way to specify col- atrribute in JSX */}
                <Col md={{ size: 6, offset: 2 }}>
                    <div className="form-check">
                        <Label check>
                            <Control.checkbox model=".agree" name="agree"
                                className="form-check-input" />
                            <strong>  May we contact you?</strong>
                        </Label>
                    </div>
                </Col>
                <Col md={{ size: 3, offset: 1 }}>
                    <Control.select model=".contactType" name="contactType"
                        className="form-control">
                        <option>Tel.</option>
                        <option>Email</option>
                    </Control.select>
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="message" md={2}>Messages</Label>
                <Col md={10}>
                    <Control.textarea model=".message" id="message" name="message"
                        rows="6" className="form-control" />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit">
                        SUBMIT
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default ReservationForm;