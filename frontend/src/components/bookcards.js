import React, { useRef, useEffect } from 'react';

import {
    PreviousButton,
    NextButton,
    BorrowListButton,
    BooksList,
    Title,
    CardContainer
  } from './Styles';

  import leftArrowImage from "../images/left-arrow.png";
  import rightArrowImage from "../images/right-arrow.png";


import bookData from './BookData';
import CardComponent from './Card';

const BookCards = () => {
    
    useEffect(() => {

        const handleResize = () => {
          cardContainerRef1.scrollLeft = 0; // Reset scroll position on resize
          cardContainerRef2.scrollLeft = 0; // Reset scroll position on resize
          cardContainerRef3.scrollLeft = 0; // Reset scroll position on resize

        };
      
        window.addEventListener('resize', handleResize);
      
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const cardContainerRef1 = useRef(null);
      const cardContainerRef2 = useRef(null);
      const cardContainerRef3 = useRef(null);
      
    const handleNextClick = (ref) => {
      const containerWidth = ref.current.offsetWidth;
      ref.current.scrollLeft += containerWidth + 20;
    };
  
    const handlePreviousClick = (ref) => {
      const containerWidth = ref.current.offsetWidth;
      ref.current.scrollLeft -= containerWidth + 20;
    };
      
    return (
      <div>
        <Title style={{ marginLeft: '80px', marginTop: '40px'}}>Top Trending Books of 2023</Title>
        <BooksList>
          <PreviousButton onClick={() => handlePreviousClick(cardContainerRef1)}>
            <img src={leftArrowImage} alt="Left arrow" />
          </PreviousButton>
          <NextButton onClick={() => handleNextClick(cardContainerRef1)}>
            <img src={rightArrowImage} alt="Right arrow" />
          </NextButton>

          <CardContainer ref={cardContainerRef1}>

            {bookData.map((book) => (
              // console.log(book.title, book.subject,book.author,book.releasedate,book.image,book.id)
              <CardComponent title={book.title} desc={book.subject} author={book.author} relase={book.releasedate} img={book.image} id={book.id}></CardComponent>
            ))}


            
          </CardContainer>
        </BooksList>

        <Title style={{ marginLeft: '80px', marginTop: '40px'}}>Best Selling Books of 2023</Title>
        
        <BooksList>
        <PreviousButton onClick={() => handlePreviousClick(cardContainerRef2)}>
            <img src={leftArrowImage} alt="Left arrow" />
          </PreviousButton>
          <NextButton onClick={() => handleNextClick(cardContainerRef2)}>
            <img src={rightArrowImage} alt="Right arrow" />
          </NextButton>

          <CardContainer ref={cardContainerRef2}>

             {bookData.map((book) => (
              <CardComponent title={book.title} desc={book.subject} author={book.author} relase={book.releasedate} img={book.image} id={book.id}></CardComponent>
            ))}

          </CardContainer>
        </BooksList>

        <Title style={{ marginLeft: '80px', marginTop: '40px'}}>All Time Favourites</Title>
        <BooksList>
        <PreviousButton onClick={() => handlePreviousClick(cardContainerRef3)}>
            <img src={leftArrowImage} alt="Left arrow" />
          </PreviousButton>
          <NextButton onClick={() => handleNextClick(cardContainerRef3)}>
            <img src={rightArrowImage} alt="Right arrow" />
          </NextButton>

          <CardContainer ref={cardContainerRef3}>
          

             {bookData.map((book) => (
              <CardComponent title={book.title} desc={book.subject} author={book.author} relase={book.releasedate} img={book.image} id={book.id}></CardComponent>
            ))}
            


          </CardContainer>
        </BooksList>

      </div>
    );
  };
  
  export default BookCards;