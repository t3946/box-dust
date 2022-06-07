import * as React from "react";
import { Modal } from "react-bootstrap";
import { PropsWithChildren } from "react";

export type IProps = PropsWithChildren<any>;

export const ModalBody: React.FC<IProps> = function (props) {
  const { children } = props;

  return <Modal.Body {...props}>{children}</Modal.Body>;
};

export default ModalBody;
