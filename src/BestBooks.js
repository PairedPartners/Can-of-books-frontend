import React from 'react';
import axios from 'axios';
import BookCarousel from './BookCarousel';
import { Button, Carousel } from 'react-bootstrap';
import library1 from './img/library1.jpg';
import AddForm from "./AddForm";
import { withAuth0 } from '@auth0/auth0-react';
// import UpdateModal from "./UpdateModal"

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      image: [],
      showModal: false,
      showUpdateModal: false,
      bookToUpdate: {}
    }
  }

  async componentDidMount() {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        // Alternate: Using just config file
        // const config = {
        //   headers: { "Authorization": `Bearer ${jwt}` },
        //   method: 'get',
        //   url: `${process.env.REACT_APP_SERVER}/books`
        // }
        // const bookData = await axios(config);
        // this.setState({books: bookData.data});
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` }
        }
        const bookData = await axios(`${process.env.REACT_APP_SERVER}/books`, config);
        this.setState({ books: bookData.data });
      }
    }
    catch (err) { console.error(err) }
  }

  async fetchBooks() {
    let url = `${process.env.REACT_APP_SERVER}/books`;
    try {
      const response = await axios.get(url);
      this.setState({
        books: response.data
      }, () => console.log(this.state.books));
    } catch (err) { console.log(err) }
  }

  postBooks = async (newBook) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` }
        }
        let url = `${process.env.REACT_APP_SERVER}/books`;
        const response = await axios.post(url, newBook, config)
        console.log(response.data);
        //Using elipses/spread to copy over old data and add new book into new array
        this.setState({ books: [...this.state.books, response.data] })
      }
    }
    catch (err) { console.error(err) }
  }

  deleteBooks = async (_id) => {
    console.log(_id);
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${_id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(book => book._id !== _id);
      this.setState({ books: updatedBooks });
    }
    catch (err) { console.error(err) }
  }

  putBook = async (updatedBooks) => {
    console.log(updatedBooks);
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${updatedBooks._id}`;
      await axios.put(url, updatedBooks);
      const updatedBooksArr = this.state.books.map(oldBook => updatedBooks._id === oldBook._id ? updatedBooks : oldBook);
      this.setState({ books: updatedBooksArr });
    }
    catch (err) { console.error(err) }
  }

  handleModal = () => {
    this.setState({
      showModal: true
    })
  }

  // closeModal = () => {
  //   console.log('testing');
  //   this.setState({ showModal: false }, () => console.log(this.state.showModal))
  //   console.log('after setting state')
  //   // this.setState({

  //   //   showModal: false

  //   // },
  //   //   () => console.log(this.state.showModal)
  //   // )
  // }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  handleUpdateModal = (book) => this.setState({ showUpdateModal: true, bookToUpdate: book }, console.log("hello", this.state.showModal))
  closeUpdateModal = () => this.setState({ showUpdateModal: false }, console.log("I should be closed"))

  // Tester code
  // function ImageCycle() {
  //   const [index, setIndex] = useState(1);

  //   const handleClick = () => {
  //     setIndex(index => index % 3 + 1);
  //   };

  //   const imageUrl = `library${index}.jpg`;

  //   return (
  //     <img src={imageUrl} onClick={handleClick} alt="Cycle" />
  //   );
  // }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Library &amp; Bookshelf</h2>
        <Button onClick={this.handleModal}>
          Add Book
          {this.state.showModal && (
            <AddForm
              postBooks={this.postBooks}
              showModal={this.state.showModal}
              closeModal={this.closeModal} />
          )}
        </Button>
        {this.state.books.length > 0 ? (
          <Carousel>
            {this.state.books.map((book, id) => {
              return (
                <Carousel.Item key={id}>
                  <img
                    className="d-block w-100"
                    src={library1}
                    alt="First slide"
                  />
                  <BookCarousel
                    book={book}
                    deleteBooks={this.deleteBooks}
                    putBook={this.putBook}
                    handleUpdateModal={this.handleUpdateModal}
                    closeUpdateModal={this.closeUpdateModal}
                    bookToUpdate={this.state.bookToUpdate}
                    showModal={this.state.showUpdateModal}
                  />
                </Carousel.Item>
              )
            })}
            {/* <UpdateModal
                    handleUpdateModal={this.handleUpdateModal}
                    closeUpdateModal={this.closeUpdateModal}
                    bookToUpdate={this.props.bookToUpdate}
                    putBook={this.props.putBook}
                /> */}

          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default withAuth0(BestBooks);
