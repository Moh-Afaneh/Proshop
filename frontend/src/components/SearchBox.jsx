import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const Nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (keyword.trim()) {
      Nav(`/search/${keyword}`);
    } else {
      Nav("/");
    }
    setKeyword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center">
        <div className="searchbar">
          <input
            className="search_input"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
          />

          <i className="fas fa-search search_icon" />
        </div>
      </div>
    </form>
  );
}
export default SearchBox;
