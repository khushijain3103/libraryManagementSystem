import {
  // BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/home";
import Signup from "./pages/user_signup";
import ViewBooks from "./pages/ViewBooks";
import Borrow from "./pages/borrow_books";
import SearchPage from "./pages/search_page";
import BookState from "./context/borrowState";

function App() {
  return (
    <BookState>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/viewbooks" element={<ViewBooks />} />
            <Route exact path="/searchpage" element={<SearchPage />} />
            <Route exact path="/borrowbooks" element={<Borrow />} />
            
          </Routes>
        </BrowserRouter>
      </div>
    </BookState>
  );
}

export default App;