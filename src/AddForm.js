import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

class AddForm extends React.Component {
  closeModal = () => {
    this.setState({
      showModal: false
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Heyo look at me for add book");
    console.log(e.target);
    const newBook = {
      title: e.target.title.value,
      genre: e.target.genre.value,
      description: e.target.description.value,
      status: e.target.status.value
    }
    console.log(newBook)
    this.props.closeModal();
    this.props.postBooks(newBook);
  }


  handleClose = (e) => {
    this.props.closeModal()
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Book Title</Form.Label>
              <Form.Control type="text" placeholder="Book title goes here..." />
            </Form.Group>

            <Form.Group controlId="genre">
              <Form.Label>Book's Genre</Form.Label>
              <Form.Control type="text" placeholder="What genre fits this book?" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Book's Description</Form.Label>
              <Form.Control type="text" placeholder="What is this book about?" />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Book's Status</Form.Label>
              <Form.Control type="text" placeholder="Is this book read? In progress? Want to be read?" />
            </Form.Group>
            <Button type="submit" onClick={this.props.closeModal}>Add Book</Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AddForm;


























