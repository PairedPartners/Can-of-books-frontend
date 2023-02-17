import React from "react";
import { Carousel } from "react-bootstrap";
import {Button} from "react-bootstrap";

class BookCarousel extends React.Component {
    render() {
        // console.log(this.props.book.title);
        return (
            <>
                {/* <Carousel.Item key={this.props.book._id}> */}
                <Carousel.Caption>
                    <h3>{this.props.book.title}</h3>
                    <p>{this.props.book.genre}</p>
                    <p>{this.props.book.description}</p>
                    <p>{this.props.book.status}</p>
                    <Button onClick={() => this.props.deleteBooks(this.props.book._id)} type = "submit">Delete Book</Button>
                </Carousel.Caption>
                {/* </Carousel.Item> */}
            </>
        )
    }
}

export default BookCarousel;