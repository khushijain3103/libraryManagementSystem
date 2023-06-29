import React, { useState } from "react";
import axios from "axios";
import ViewSearchResults from "./ViewSearchResults";
import { useNavigate } from "react-router-dom";

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
  Button,
} from "./Styles";
import { useAuth0 } from "@auth0/auth0-react";
import Borrow from "../pages/borrow_books";
import { useEffect } from "react";

const NavbarHead = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showBorrow, setShowBorrow] = useState(false);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      console.log(searchValue);
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: searchValue,
          },
        }
      );

      console.log(response.data);
      setSearchResults(response.data);

      navigate("/searchpage", { state: { searchResults: response.data } });

      searchValue("");
    } catch (error) {
      console.error(error);
    }
  };

  const display = () => {
    setShowBorrow((prev) => !prev);
  };

  console.log(showBorrow);

  return (
    <>
      <div>
        <GlobalStyle />
        <Navbar>
          <NavLinks>
            <NavItem>
              <NavLink href="/">
                <Button>Home</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/viewbooks">
                <Button>View Books</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <Button onClick={display} type="submit">
                Borrowed Books
              </Button>
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
          {isAuthenticated && (
            <RightContainer style={{ marginLeft: "20px", marginRight: "20px" ,color:"white"}}>
              <BrandLogo src="logo.jpg" alt="Library Management System Logo" />
              <p>{user.email}</p>
            </RightContainer>
          )}
          <NavItem>
            {/* <LoginLink href="/login">Login</LoginLink> */}
            {isAuthenticated ? (
              <Button
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
                // style={{ padding: "10px", "margin-top": "-12px" }}
                type="submit">
                Log Out
              </Button>
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                // style={{ padding: "10px", "margin-top": "-12px" }}
                type="submit">
                Login
              </Button>
            )}
          </NavItem>
        </Navbar>
        {searchResults && <ViewSearchResults searchResults={searchResults} />}
      </div>
      {showBorrow && <Borrow></Borrow>}
    </>
  );
};

export default NavbarHead;
