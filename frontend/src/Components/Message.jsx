import React from "react";
import { Alert } from "react-bootstrap";

const Message = (variant, children) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;

// Explanation: This is a component that will display a message. It will take in a variant and children as props. The variant will be used to determine the color of the message. The children will be used to determine the message. If the variant is not passed in, it will default to info.
