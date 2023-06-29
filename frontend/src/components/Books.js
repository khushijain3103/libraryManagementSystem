import React from "react";
import { useState, useEffect } from "react";
import CardComponent from "./Card";

// import book1 from "../images/books.jpg";

import {
  BooksViewList,
  BookCard,
  BookBody,
  BookImage,
  BookName,
  BookDescription,
  Button,
  FilterContainer,
  Input,
} from "./Styles";

const booksPerPage = 3;

const Books = () => {
  const [bookData, setBookData] = useState([]);

  function fetchData() {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyB5a0vPyyTQrac6_K4cDIX0BO0z7Okva-I"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const transformData = data?.items?.map((item) => {
          return {
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors[0],
            releasedate: item.volumeInfo.publishedDate,
          };
        });

        setBookData(transformData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState(bookData);
  const [filterCriteria, setFilterCriteria] = useState({
    title: "",
    author: "",
    subject: "",
    releasedate: "",
  });

  useEffect(() => {
    filterBooks();
  }, [filterCriteria, bookData]);

  // Calculate indexes for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks?.slice(indexOfFirstBook, indexOfLastBook); // Update this line

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter books
  const filterBooks = () => {
    const { title, author, releasedate } = filterCriteria;
    const filtered = bookData?.filter((book) => {
      const matchesTitle = book.title
        .toLowerCase()
        .includes(title.toLowerCase());
      const matchesAuthor = book.author
        .toLowerCase()
        .includes(author.toLowerCase());
      // const matchesSubject = book.subject.toLowerCase().includes(subject.toLowerCase());
      const matchesReleaseDate = book.releasedate
        .toLowerCase()
        .includes(releasedate.toLowerCase());
      return matchesTitle && matchesAuthor && matchesReleaseDate;
    });
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterCriteria({
      title: "",
      author: "",
      releasedate: "",
    });
    setCurrentPage(1);
  };

  return (
    <div>
      <div
        style={{ marginLeft: "50px", marginTop: "20px", marginBottom: "10px" }}
      >
        <BookName>Filter by:</BookName>
      </div>

      <FilterContainer>
        <Input
          type="text"
          placeholder="Title"
          value={filterCriteria.title}
          onChange={(e) =>
            setFilterCriteria((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
        />
        <Input
          type="text"
          placeholder="Author"
          value={filterCriteria.author}
          onChange={(e) =>
            setFilterCriteria((prevState) => ({
              ...prevState,
              author: e.target.value,
            }))
          }
        />
        <Input
          type="text"
          placeholder="Release Date"
          value={filterCriteria.releasedate}
          onChange={(e) =>
            setFilterCriteria((prevState) => ({
              ...prevState,
              releasedate: e.target.value,
            }))
          }
        />

        <Button style={{ marginBottom: "10px" }} onClick={resetFilters}>
          Reset Filters
        </Button>
      </FilterContainer>

      {/* Filter Counts */}
      <div
        style={{ marginLeft: "50px", marginTop: "20px", marginBottom: "10px" }}
      >
        <BookName>
          Total Books in Library: {bookData?.length} | Total Filtered Books:{" "}
          {filteredBooks?.length}
        </BookName>
      </div>

      <BooksViewList>
        {currentBooks?.map((book) => (
          // <BookCard key={book.id}>
          //   {/* <BookImage src={book1} alt={book.title} /> */}
          //   <BookBody>
          //     <BookName>{book.title}</BookName>
          //     <BookDescription>By {book.author}</BookDescription>
          //     <BookDescription>
          //       Release Date: {book.releasedate}
          //     </BookDescription>
          //   </BookBody>
          // </BookCard>
          <CardComponent
              title={book.title}
              desc={book.subject}
              author={book.author}
              release={book.releasedate}
              img={book.image}
              id={book.id}
            ></CardComponent>
        ))}
      </BooksViewList>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "50px",
          marginTop: "20px",
        }}
      >
        {Array.from({
          length: Math.ceil(bookData?.length / booksPerPage),
        })?.map((_, index) => (
          <Button
            style={{ margin: "0 4px", marginBottom: "10px" }}
            key={index}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Books