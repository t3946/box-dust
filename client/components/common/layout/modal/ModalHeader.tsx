import * as React from "react";
import { Modal } from "react-bootstrap";
import Style from "@components/common/layout/modal/ModalHeader.module.scss";
import cn from "classnames";
import IconCross from "@components/common/icons/cross/Cross";

export interface IProps {
  header: string;
  subheader?: string;
  handleClose: any;
}

export const ModalHeader: React.FC<IProps> = function (props) {
  const { header, subheader, handleClose } = props;

  return (
    <Modal.Header
      className={cn([
        "d-flex",
        "flex-column",
        "align-items-center",
        "w-100",
        "position-relative",
        "border-0",
      ])}
    >
      {header && <Modal.Title className={Style.header}>{header}</Modal.Title>}

      {subheader && (
        <p className={cn([Style.subheader, "mb-0"])}>{subheader}</p>
      )}

      <div className={Style.header__buttonClose} onClick={handleClose}>
        <IconCross className={Style.iconClose} />
      </div>
    </Modal.Header>
  );
};

export default ModalHeader;
