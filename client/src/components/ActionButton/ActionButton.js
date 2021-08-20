import Button from "react-bootstrap/Button";
function ActionButton({ show, func: { handleClose, blogDelete, getValues } }) {
  const handleDelete = async () => {
    let blogID = getValues("txtID");
    await blogDelete(blogID);
    handleClose();
  };
  return (
    <>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      {show.type === "add" ? null : (
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      )}

      <Button variant="primary" type="submit">
        Add Changes
      </Button>
    </>
  );
}

export default ActionButton;
