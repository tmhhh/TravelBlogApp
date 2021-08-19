import BlogForm from "./components/BlogForm";
const headerStyle = {
  width: "100%",
  background: "blue",
  fontSize: "20px",
  fontWeight: "700",
  textAlign: "center",
  color: "white",
  height: "30px",
};
function App() {
  return (
    <>
      {/* <header style={headerStyle} className="header">
        Blog
      </header> */}
      <BlogForm />
    </>
  );
}

export default App;
