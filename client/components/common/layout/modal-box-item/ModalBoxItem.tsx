import * as React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Style from "@components/common/layout/modal-box-item/ModalBoxItem.module.scss";
import cn from "classnames";
import getImageUrl from "@utils/getImageUrl";
import CrossLarge from "@components/common/icons/cross-large/CrossLarge";

export interface IProps {
  item: Record<any, any>;
  show: boolean;
  handleClose: any;
  actions?: any;
}

export const ModalBoxItem: React.FC<IProps> = function (props) {
  const { item, show, handleClose, actions } = props;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered={true}
        contentClassName={Style.container}
        dialogClassName={Style.dialog}
      >
        <Modal.Body>
          <div className={Style.closeButton} onClick={handleClose}>
            <CrossLarge className={Style.closeButtonIcon} />
          </div>

          <div>
            <h2 className={cn(["text-center my-4 mt-md-4", Style.titleSecond])}>
              <span className="d-md-none">{item.short_name}</span>
              <span className="d-none d-md-block">{item.name}</span>
            </h2>
          </div>

          <div className={"my-3"}>
            <Row>
              <Col xs={12} md={5} className={"text-center mb-3 mb-md-0"}>
                <img
                  src={getImageUrl(item.image.name)}
                  alt={item.name}
                  className={Style.image}
                />
              </Col>

              <Col xs={12} md={7}>
                <div dangerouslySetInnerHTML={{ __html: item.description }} />

                <div className="mt-4 d-flex justify-content-md-between flex-column flex-lg-row">
                  {actions}
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalBoxItem;
