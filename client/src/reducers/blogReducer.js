function blogReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_BLOG":
      return {
        isLoading: payload.isLoading,
        listBlogs: payload.listBlogs,
      };
    case "SET_BLOG_FAIL":
      return {
        ...state,
        isLoading: false,
        listBlogs: [],
      };
    case "UPDATE_BLOG":
      return {
        ...state,
        listBlogs: state.listBlogs.map((blog) => {
          if (blog.blogID === payload.blog.blogID) return payload.blog;
          return blog;
        }),
      };
    case "ADD_BLOG":
      return {
        ...state,
        listBlogs: [...state.listBlogs, payload.newBlog],
      };
    case "DELETE_BLOG":
      return {
        ...state,
        listBlogs: state.listBlogs.filter(
          (blog) => blog.blogID !== payload.deletedBlogID
        ),
      };
    default:
      return state;
  }
}

export default blogReducer;
