import borrowContext from "./borrowContext";
import { useState, useEffect } from "react";

const BorrowState = (props) => {
  const [bookData, setBookData] = useState([]);

  function fetchData() {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=react&key=AIzaSyB5a0vPyyTQrac6_K4cDIX0BO0z7Okva-I"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("name", data);
        //  setPosts(data);
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

  const state = {
    books: bookData,
  };

  const [borrowBooks, setBorrowBooks] = useState([]);

  console.log({bookData});
  console.log(borrowBooks);

  const addBook = (book) => {
    setBorrowBooks([...borrowBooks, book]);
  };

  const removeBook = (book) => {
    console.log(book);
    setBorrowBooks(borrowBooks.filter((item) => item !== book));
  };

  const inBorrow = (book) => {
    if (borrowBooks.includes(book)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <borrowContext.Provider
      value={{
        state,
        borrowBooks,
        setBorrowBooks,
        addBook,
        removeBook,
        inBorrow,
      }}
    >
      {props.children}
    </borrowContext.Provider>
  );
};

export default BorrowState;