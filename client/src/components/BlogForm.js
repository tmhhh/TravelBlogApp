import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FormData from "form-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEllipsisV,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const BlogForm = () => {
  const blogFormStyle = {
    margin: "50px 0 50px 0 ",
    width: "40%",
    height: "550px",
    boxShadow: "5px 5px 5px",
    background: "whitesmoke",
  };
  const blogHeaderStyle = {
    display: "flex",
    padding: "20px",
    position: "relative",
  };
  const userImageStyle = {
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    marginRight: "5px",
  };
  const blogImageStyle = {
    width: "100%",
    height: "200px",
    backgroundSize: "cover",
  };
  const blogTitleStyle = {
    fontSize: "30px",
    fontWeigh: "700",
    padding: "10px",
    borderBottom: "1px solid black",
  };
  const blogContentStyle = {
    padding: "10px",
  };
  const blogFooterStyle = {
    marginTop: "20px",
    padding: "10px",
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    // alignItems: "start",
  };
  const addBtnStyle = {
    position: "fixed",
    right: "20px",
    bottom: "20px",
  };
  //
  //
  const [show, setShow] = useState(false);
  // const [blogTitle, setBlogTitle] = useState("");
  // const [blogContent, setBlogContent] = useState("");
  // const [blogImage, setBlogImage] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const [blogData, setBlogData] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };
  //get data
  useEffect(() => {
    axios
      .get("http://localhost:4000/Blogs")
      .then((result) => {
        const { data } = result;
        setBlogData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //post data
  const onSubmit = async (e) => {
    // console.log(e);
    const data = new FormData();
    data.append("picture", e.picture[0]);
    data.append("title", e.txtTitle);
    data.append("content", e.txtContent);
    await axios({
      method: "post",
      url: "http://localhost:4000/Blogs",
      data,
    });
    reset();
    handleClose();
  };
  //reset form value

  return (
    <div style={containerStyle} className="container">
      {Object.keys(blogData).length !== 0 ? (
        blogData.map((blog) => (
          <div key={blog.blogID} style={blogFormStyle} className="blog-form">
            <div style={blogHeaderStyle} className="blog-header">
              <img
                style={userImageStyle}
                className="user-img"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                alt="pic"
              />
              <div className="blog-header-info">
                <p className="user-name">Hoang</p>
                <p className="date-posted">12-6-2000</p>
              </div>
              <FontAwesomeIcon
                style={{
                  position: "absolute",
                  right: "15px",
                  cursor: "pointer",
                }}
                icon={faEllipsisV}
              />
            </div>
            <div className="blog-body">
              <img style={blogImageStyle} src={blog.blogImage} />
              <h3 style={blogTitleStyle} className="blog-title">
                {blog.blogTitle}
              </h3>
              <p style={blogContentStyle} className="blog-content">
                {blog.blogContent}
              </p>
            </div>
            <div style={blogFooterStyle} className="blog-footer">
              <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faHeart} />
              {blog.blogLike} likes
            </div>
          </div>
        ))
      ) : (
        <div>Nothing</div>
      )}
      <Button
        style={addBtnStyle}
        variant="none"
        className="add-btn"
        onClick={handleOpen}
      >
        <FontAwesomeIcon
          style={{ fontSize: "40px", color: "blue" }}
          icon={faPlusCircle}
        />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add new blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>Blog Title:</span>
            <input
              // value={txtTitle}
              // onChange={handleOnChange}
              style={{ width: "100%", marginBottom: "10px" }}
              type="text"
              placeholder="Blog title ..."
              // onChange={(e) => setBlogTitle(e.target.value)}
              {...register("txtTitle")}
            />
            <span>Blog Content:</span>
            <textarea
              {...register("txtContent")}
              style={{
                paddingLeft: "5px",
                width: "100%",
                marginBottom: "10px",
              }}
              placeholder="Content ..."
              // onChange={(e) => setBlogContent(e.target.value)}
            />
            <span style={{ marginRight: "20px" }}>Blog Image:</span>

            <input {...register("picture")} type="file" />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
export default BlogForm;
