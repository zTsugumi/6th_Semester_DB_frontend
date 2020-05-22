import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalHeader, ModalBody, Label, Form, FormGroup, Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { baseUrl } from '../../shared/baseUrl';
import Util from '../Alert/Util';
import FadeIn from 'react-fade-in';
import './Dishdetail.css';

// ?? Need to handle favorite
// ?? Need to handle overflow of comments, create a box for comments
// ?? Bug that react reloading the site when adding comments
function RenderDish({ dish, favorite, postFavorite }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish._id)}>
                        {favorite ?
                            <span className="fa fa-heart"></span>
                            :
                            <span className="fa fa-heart-o"></span>
                        }
                    </Button>
                </CardImgOverlay>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText className="text-justify">{dish.description}</CardText>
                    <CardText>Price: ${dish.price / 100}</CardText>
                </CardBody>
            </Card>

        </div>
    );
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(event) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, this.rating.value, this.comment.value)
            .then(
                (response) => {
                    if (response.type === 'POST_COMMENT_FAILED')
                        Util.alert(false, "Post comment is not available for guest", false);
                }
            );
        event.preventDefault();
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal} >
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="select" id="rating" name="rating"
                                    innerRef={(input) => this.rating = input} >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" rows="6" id="comment" name="comment"
                                    innerRef={(input) => this.comment = input} />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        )
    };
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="row list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <div className="col-12 mt-2">
                                <li>{comment.comment}</li>
                                <li>Rating: {comment.rating}</li>
                                <li>-- {comment.author.firstname} {comment.author.lastname} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.updatedAt)))}</li>
                            </div>
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    else
        return (
            <div></div>
        );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <FadeIn>
                <div className="container dishdetail--container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                        <RenderDish dish={props.dish} favorite={props.favorite} postFavorite={props.postFavorite} />
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish._id} />
                    </div>
                </div>
            </FadeIn>
        );
    }
    else
        return (<div></div>);
}

export default DishDetail;