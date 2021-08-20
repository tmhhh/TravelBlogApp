import { useContext } from "react";
import Form from "react-bootstrap/Form";
import { BlogContext } from "../../contexts/BlogContext";
import "./style.css";
function SearchBar() {
  const { blogSearching, getBlogData } = useContext(BlogContext);
  const handleOnChange = (e) => {
    let keyword = e.target.value.trim(" ");
    if (keyword !== "") {
      blogSearching(e.target.value);
    } else getBlogData();
  };

  //   if (input === "") {
  //     getBlogData();
  //   }
  return (
    <Form.Control
      onChange={handleOnChange}
      className="search-bar"
      type="text"
      placeholder="Search for blog ..."
    />
  );
}

export default SearchBar;
