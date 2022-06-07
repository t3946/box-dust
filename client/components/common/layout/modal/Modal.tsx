import * as React from "react";
import { Modal as BootstrapModal } from "react-bootstrap";
import { PropsWithChildren } from "react";

export interface IProps extends PropsWithChildren<any> {
  centered?: boolean;
  handleClose: any;
  show: boolean;
}

export const Modal: React.FC<IProps> = function (props) {
  const { centered, children, handleClose, show } = props;

  return (
    <>
      <BootstrapModal show={show} onHide={handleClose} centered={centered}>
        {children}
      </BootstrapModal>
    </>
  );
};

export default Modal;
