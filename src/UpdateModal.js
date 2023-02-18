import React from 'react';
import { Modal, Form, Button, Container } from "react-bootstrap";


class UpdateModal extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Heyo look at me for book update");
    const updatedBook = {
      title: e.target.title.value || this.props.bookToUpdate.title,
      genre: e.target.genre.value || this.props.bookToUpdate.genre,
      description: e.target.description.value || this.props.bookToUpdate.description,
      status: e.target.status.value || this.props.bookToUpdate.status,
      _id: this.props.bookToUpdate._id
    }
    console.log(updatedBook)
    // this.props.closeModal();
    this.props.putBook(updatedBook);
  }


  render() {
    return (
      <Modal show={this.props.handleUpdateModal} onHide={this.props.closeUpdateModal}>
        <Modal.Header>
          <Modal.Title>Update a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder={this.props.bookToUpdate.title} />
              </Form.Group>

              <Form.Group controlId="genre">
                <Form.Label>Book's Genre</Form.Label>
                <Form.Control type="text" placeholder={this.props.bookToUpdate.genre} />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Book's Description</Form.Label>
                <Form.Control type="text" placeholder={this.props.bookToUpdate.description} />
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Book's Status</Form.Label>
                <Form.Control type="text" placeholder={this.props.bookToUpdate.status} />
              </Form.Group>
              <Button type="submit" onClick={this.props.closeUpdateModal}>Update Book</Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}

export default UpdateModal;