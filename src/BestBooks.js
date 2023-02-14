import React from 'react';
import axios from 'axios';
import BookCarousel from './BookCarousel';
import { Carousel } from 'react-bootstrap';
import library1 from './img/library1.jpg';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      image: []
    }
  }

  componentDidMount() {
    this.fetchBooks();
    // link to unsplash API
    // this.fetchImage()
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
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
                  <BookCarousel book={book} />
                </Carousel.Item>
              )
            })}
          </Carousel>

        ) : (
          <h3>No Books Found :(</h3>
        )}

      </>
    )
  }
}

export default BestBooks;
