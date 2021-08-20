import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FormData from "form-data";
import { useState, useContext } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../contexts/AuthContext";

import Blog from "../Blog/Blog";
import DashboardLayout from "../Layouts/DashboardLayout";
import { BlogContext } from "../../contexts/BlogContext";
import SearchBar from "../SearchBar/SearchBar";
import ActionButton from "../ActionButton/ActionButton";
const addBtnStyle = {
  position: "fixed",
  right: "20px",
  bottom: "20px",
};

const Dashboard = () => {
  //
  // const { authState } = useContext(AuthContext);
  const { blogState, blogLike, blogAdd, blogDelete, blogEdit } =
    useContext(BlogContext);
  //
  const [show, setShow] = useState({
    isShown: false,
    type: "",
  });
  const { register, handleSubmit, reset, setValue, getValues } = useForm();

  const handleClose = () => {
    reset();
    setShow({ ...show, isShown: false });
  };
  const handleOpen = () => {
    setShow({ type: "add", isShown: true });
  };
  //get data

  //post data
  const onSubmit = async (e, type) => {
    let data = new FormData();
    data.append("picture", e.picture[0]);
    data.append("title", e.txtTitle);
    data.append("content", e.txtContent);
    if (type === "update") {
      data.append("id", getValues("txtID"));
      console.log(e.txtTitle, e.txtContent);
      await blogEdit(data);
      handleClose();
    } else {
      await blogAdd(data);
      handleClose();
    }
  };
  //reset form value

  return (
    <DashboardLayout>
      <SearchBar />
      {blogState.isLoading ? (
        <Spinner
          style={{ position: "absolute", left: "50%", top: "50%" }}
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : blogState.listBlogs.length > 0 ? (
        blogState.listBlogs.map((blog) => (
          <Blog
            key={blog.blogID}
            blog={blog}
            func={{ onSubmit, blogLike, setShow, setValue }}
          />
        ))
      ) : null}

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
      <Modal show={show.isShown} onHide={handleClose}>
        <form onSubmit={handleSubmit((data) => onSubmit(data, show.type))}>
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
            <ActionButton
              show={show}
              func={{ handleClose, blogDelete, getValues }}
            />
          </Modal.Footer>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
export default Dashboard;
