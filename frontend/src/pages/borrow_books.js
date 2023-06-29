import React, { useContext, useEffect, useState } from "react";
import { CardContainer, GlobalStyle, HeadTitle } from "../components/Styles";
import NavbarHead from "../components/NavbarHead";
import FooterBottom from "../components/FooterBottom";
import bookContext from "../context/borrowContext";
import CardComponent from "../components/Card";

const Borrow = () => {
  const state = useContext(bookContext);
  const borrowBooks = state.borrowBooks;
  const bookData = state.state.books;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const arr = bookData.filter((item) => {
      if (borrowBooks.includes(item.id)) {
        return item;
      }
    });

    setBooks(arr);
  }, [borrowBooks]);

  return (
    <div>
      <GlobalStyle />
      <NavbarHead />
      <HeadTitle style={{ marginTop: "130px" }}>Your Books</HeadTitle>
      <CardContainer>
        {books &&
          books?.map((book) => (
            <CardComponent
              title={book.title}
              desc={book.subject}
              author={book.author}
              release={book.releasedate}
              img={book.image}
              id={book.id}
            ></CardComponent>
          ))}
      </CardContainer>
      <FooterBottom />
    </div>
  );
};

export default Borrow;