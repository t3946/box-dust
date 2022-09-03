import * as React from "react";
import Modal from "@components/common/layout/modal/Modal";
import ModalHeader from "@components/common/layout/modal/ModalHeader";
import ModalBody from "@components/common/layout/modal/ModalBody";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import { modalClose, modalOpen } from "@redux/reducer/Popup";
import RegisterForm from "@components/pages/main/modal-register/RegisterForm";
import ConfirmEmail from "@components/pages/main/modal-register/ConfirmEmail";
import SendConfirmEmail from "@components/pages/main/modal-register/SendConfirmEmail";
import RegisterComplete from "@components/pages/main/modal-register/RegisterComplete";

export enum Stages {
  REGISTER_BY_EMAIL,
  SEND_CONFIRM_EMAIL,
  CONFIRM_EMAIL,
  EMAIL_CONFIRMED,
}

export const ModalRegister: React.FC = function () {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.popup.modal.register.show);
  const [confirmEmail, setConfirmEmail] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [stage, setStage] = React.useState(Stages.REGISTER_BY_EMAIL);
  const modalHeader = {
    [Stages.REGISTER_BY_EMAIL]: "Регистрация",
    [Stages.SEND_CONFIRM_EMAIL]: "Подтверждение Email",
    [Stages.CONFIRM_EMAIL]: "Подтверждение Email",
    [Stages.EMAIL_CONFIRMED]: "Регистрация",
  };
  const modalHeaderCaption = {
    [Stages.REGISTER_BY_EMAIL]: "Регистрация по email",
    [Stages.SEND_CONFIRM_EMAIL]: "Для завершения регистрации подтвердите email",
    [Stages.CONFIRM_EMAIL]:
      "На ваш email был отправлен код подтверждения. Скопируйте его и введите в этой форме",
    [Stages.EMAIL_CONFIRMED]: "Поздравляем. Регистрация завершена.",
  };

  function handleClose() {
    dispatch(
      modalClose({
        modal: "register",
      })
    );
  }

  function contentTemplate() {
    switch (stage) {
      case Stages.REGISTER_BY_EMAIL:
        return <RegisterForm setEmail={setEmail} setStage={setStage} />;
      case Stages.SEND_CONFIRM_EMAIL:
        return <SendConfirmEmail email={email} setStage={setStage} />;
      case Stages.CONFIRM_EMAIL:
        return <ConfirmEmail email={email} setStage={setStage} />;
      case Stages.EMAIL_CONFIRMED:
        return <RegisterComplete handleClose={handleClose} />;
    }
  }

  return (
    <>
      <Modal centered={true} show={show} handleClose={handleClose}>
        <ModalHeader
          header={modalHeader[stage]}
          subheader={modalHeaderCaption[stage]}
          handleClose={handleClose}
        />

        <ModalBody>{contentTemplate()}</ModalBody>
      </Modal>
    </>
  );
};

export default ModalRegister;
