import React, { useState } from 'react';
import axios from 'axios';
import ViewSearchResults from './ViewSearchResults';
import { useNavigate } from 'react-router-dom';

import {
  GlobalStyle,
  Navbar,
  NavLinks,
  NavLink,
  NavItem,
  SearchBox,
  RightContainer,
  BrandLogo,
  LoginLink, 
  Button
} from './Styles';
import { useAuth0 } from '@auth0/auth0-react';
import Borrow from '../pages/borrow_books';

const NavbarHead = () => {

  
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [showBorrow, setShowBorrow] = useState(false);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {

      console.log(searchValue);
      // Make a request to the Google Books API
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: searchValue,
        },
      });
      
      // Handle the response data here
      console.log(response.data);
      setSearchResults(response.data);
      
      // Navigate to the SearchResults page with the search results
      navigate('/searchpage', { state: { searchResults: response.data } });

      // Reset the search term
      searchValue('');

    } catch (error) {
      // Handle any errors
      console.error(error);
    }


  };

  return (
    <>
    <div>
      <GlobalStyle />
      <Navbar>
        <NavLinks>
          <NavItem>
            {/* <LoginLink href="/login">Login</LoginLink> */}
            {isAuthenticated ? <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} style={{ "padding": "10px", "margin-top": "-12px"}} type="submit">Log Out</Button> : 
          <Button onClick={() => loginWithRedirect()} style={{ "padding": "10px", "margin-top": "-12px"}} type="submit">Login</Button>
          }
          </NavItem>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/viewbooks">View Books</NavLink>
          </NavItem>
          <NavItem>
            {/* <NavLink href="/borrowbooks">Borrow Books</NavLink> */}
            {/* <Borrow></Borrow> */}
            <Button onClick={() => {setShowBorrow(true)}}>Borrowed Books </Button>
          </NavItem>
          <NavItem>
            <NavLink href="/cart">View Cart</NavLink>
          </NavItem>
        </NavLinks>
        <RightContainer>

        <form onSubmit={handleSearch}>
        
        <SearchBox
              type="text"
              placeholder="Search for Books"
              id="searchInput" // Add a unique id attribute
              name="search" // Add a unique name attribute
              value={searchValue}
              onChange={handleSearchChange}
            />

        </form>

        </RightContainer>
        { isAuthenticated && <RightContainer style={{ marginLeft: '20px' }}>
          <BrandLogo src="logo.png" alt="Library Management System Logo" />
          <p>{user.email}</p>
        </RightContainer>}
      </Navbar>
      {searchResults && <ViewSearchResults searchResults={searchResults} />}

    </div>
    {showBorrow && <Borrow></Borrow> }
    </>
  );
};

export default NavbarHead;