import React from "react";
import Alert from "react-bootstrap/Alert";
function Notify({ type, content }) {
  return <Alert variant={type}>{content}</Alert>;
}

export default Notify;
