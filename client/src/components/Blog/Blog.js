import React from "react";
import { faHeart, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  blogFormStyle,
  blogHeaderStyle,
  userImageStyle,
  blogImageStyle,
  blogTitleStyle,
  blogContentStyle,
  blogFooterStyle,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Blog({ blog, func: { setShow, setValue, blogLike } }) {
  const handleShowUpdateModal = (blog) => {
    setShow({ isShown: true, type: "update" });
    setValue("txtTitle", blog.blogTitle);
    setValue("txtContent", blog.blogContent);
    setValue("txtID", blog.blogID);
  };
  return (
    <>
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
            onClick={() => handleShowUpdateModal(blog)}
            style={{
              position: "absolute",
              right: "15px",
              cursor: "pointer",
            }}
            icon={faEllipsisV}
          />
        </div>
        <div className="blog-body">
          <img
            style={blogImageStyle}
            src={blog.blogImage}
            alt={blog.blogTitle}
          />
          <h3 style={blogTitleStyle} className="blog-title">
            {blog.blogTitle}
          </h3>
          <p style={blogContentStyle} className="blog-content">
            {blog.blogContent}
          </p>
        </div>
        <div style={blogFooterStyle} className="blog-footer">
          <FontAwesomeIcon
            style={{ marginRight: "5px", color: "red", cursor: "pointer" }}
            icon={faHeart}
            onClick={() => blogLike(blog.blogID)}
          />
          {blog.blogLike} likes
        </div>
      </div>
    </>
  );
}

export default Blog;
