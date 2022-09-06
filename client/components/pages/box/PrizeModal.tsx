import * as React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Style from "@components/pages/box/PrizeModal.module.scss";
import NeonText from "@components/common/layout/neon-text/NeonText";
import cn from "classnames";
import getImageUrl from "@utils/getImageUrl";
import ButtonBlinkFlat, {
  ETheme,
} from "@components/common/ui/button-blink-flat/ButtonBlinkFlat";

export interface IProps {
  item: Record<any, any>;
  show: boolean;
  handleClose: any;
}

export const PrizeModal: React.FC<IProps> = function (props) {
  const { item, show, handleClose } = props;

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
          <div className={cn(["text-center", "mt-3", "mb-4"])}>
            <NeonText text={"Поздравляем!"} className={Style.header} />
          </div>

          <div>
            <h2 className={cn(["text-center my-4 mt-md-4", Style.titleSecond])}>
              Ваш выигрыш: <br />
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
                  <ButtonBlinkFlat
                    theme={ETheme.success}
                    className={["mb-3", "mb-lg-0"]}
                    onClick={handleClose}
                  >
                    Сохранить
                  </ButtonBlinkFlat>

                  {/*<ButtonBlinkFlat theme={ETheme.danger}>*/}
                  {/*  Продать*/}
                  {/*</ButtonBlinkFlat>*/}
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PrizeModal;
