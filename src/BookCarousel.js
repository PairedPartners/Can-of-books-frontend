import React from "react";
import { Carousel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import UpdateModal from "./UpdateModal"

class BookCarousel extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         showModal: false,
    //         bookToUpdate: {}
    //     }
    // }
    // handleModal = (book) => this.setState({ showModal: true, bookToUpdate: book}, console.log("hello", this.state.showModal))
    // closeModal = () => this.setState({ showModal: false })

    render() {
        // console.log(this.props.book.title);
        return (
            <>
                <Carousel.Caption>
                    <h3>{this.props.book.title}</h3>
                    <p>{this.props.book.genre}</p>
                    <p>{this.props.book.description}</p>
                    <p>{this.props.book.status}</p>

                    <Button onClick={() => this.props.handleUpdateModal(this.props.book)} type="submit">Update Book</Button>

                    <Button onClick={() => this.props.deleteBooks(this.props.book._id)} type="submit">Delete Book</Button>

                </Carousel.Caption>
                {this.props.showModal && (
                    <UpdateModal
                        handleUpdateModal={this.props.handleUpdateModal}
                        bookToUpdate={this.props.bookToUpdate}
                        closeUpdateModal={this.props.closeUpdateModal}
                        putBook={this.props.putBook}
                    />)}
            </>
        )
    }
}

export default BookCarousel;