import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducers/blogReducer";
import { sendRequest } from "../utils/axios";
import { API_URL } from "./constants";
export const BlogContext = createContext();
function BlogContextProvider({ children }) {
  const [blogState, dispatchBlog] = useReducer(authReducer, {
    isLoading: true,
    listBlogs: [],
  });

  //GET DATA
  const getBlogData = async () => {
    try {
      const res = await sendRequest(API_URL + "/Blogs", "GET", null);
      if (res.data.isSuccess) {
        dispatchBlog({
          type: "SET_BLOG",
          payload: { listBlogs: res.data.listBlogs, isLoading: false },
        });
      }
    } catch (error) {
      console.log(error);
      dispatchBlog({ type: "SET_BLOG_FAIL", payload: {} });
    }
  };
  const blogSearching = async (value) => {
    try {
      dispatchBlog({
        type: "SET_BLOG",
        payload: { ...blogState, isLoading: true },
      });
      setTimeout(async () => {
        const res = await sendRequest(
          `${API_URL}/Blogs/search?title=${value.toString()}`,
          "GET",
          null
        );
        if (res.data.isSuccess) {
          return dispatchBlog({
            type: "SET_BLOG",
            payload: {
              ...blogState,
              listBlogs: res.data.listBlogs,
              isLoading: false,
            },
          });
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatchBlog({ type: "SET_BLOG_FAIL", payload: null });
    }
  };
  //ADD BLOG
  const blogAdd = async (data) => {
    try {
      const res = await sendRequest(`${API_URL}/Blogs/add`, "POST", data);
      console.log(res);
      if (res.data.isSuccess) {
        dispatchBlog({
          type: "ADD_BLOG",
          payload: { newBlog: res.data.newBlog },
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //DELETE BLOG
  const blogDelete = async (id) => {
    try {
      const res = await sendRequest(`${API_URL}/Blogs/delete`, "DELETE", {
        id,
      });
      if (res.data.isSuccess)
        return dispatchBlog({
          type: "DELETE_BLOG",
          payload: { deletedBlogID: id },
        });
    } catch (err) {
      console.log(err);
    }
  };
  //UPDATE
  const blogEdit = async (data) => {
    try {
      const res = await sendRequest(`${API_URL}/Blogs/edit`, "PUT", data);
      if (res.data.isSuccess)
        return dispatchBlog({
          type: "UPDATE_BLOG",
          payload: {
            blog: res.data.updatedBlog,
          },
        });
    } catch (err) {
      console.log(err);
    }
  };
  //BLOG LIKE
  const blogLike = async (id) => {
    try {
      console.log("Like");
      const res = await sendRequest(`${API_URL}/Blogs/like`, "PUT", { id });
      if (res.data.isSuccess) {
        return getBlogData();
        // dispatchBlog({ type: "UPDATE_BLOG", payload: {blog} });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blogState);
  //GET DATA
  useEffect(() => {
    getBlogData();
  }, []);
  const blogContextData = {
    blogState,
    dispatchBlog,
    blogSearching,
    getBlogData,
    blogLike,
    blogAdd,
    blogEdit,
    blogDelete,
  };
  return (
    <BlogContext.Provider value={blogContextData}>
      {children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
