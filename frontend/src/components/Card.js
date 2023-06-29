import { useContext, useState } from "react";
import {
  Card,
  CardBody,
  CardDescription,
  CardImage,
  BorrowListButton,
  CardName,
} from "./Styles";
import bookContext from "../context/borrowContext";
// import book from "../images/books.jpg";

const CardComponent = ({ img, title, desc, borrow, author, release, id }) => {
  const data = useContext(bookContext);
  const addBook = data.addBook;
  const removeBook = data.removeBook;
  const inBor = data.inBorrow(id);

  return (
    <Card>
      {/* <CardImage src={book} /> */}
      <CardBody>
        <CardName>{title}</CardName>
        <p>{author}</p>
        <p>{release}</p>
        <CardDescription>{desc}</CardDescription>
        {!inBor ? (
          <BorrowListButton
            onClick={() => {
              console.log("add to borrow books");
              addBook(id);
            }}
          >
            Borrow
          </BorrowListButton>
        ) : (
          <BorrowListButton
            onClick={() => {
              console.log("remove to borrow books");
              removeBook(id);
            }}
          >
            Remove from Borrow
          </BorrowListButton>
        )}
      </CardBody>
    </Card>
  );
};

export default CardComponent;