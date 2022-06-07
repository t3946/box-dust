import * as React from "react";
import Modal from "@components/common/layout/modal/Modal";
import ModalHeader from "@components/common/layout/modal/ModalHeader";
import ModalBody from "@components/common/layout/modal/ModalBody";
import {
  Button,
  InputGroup,
  FormControl,
  Form as RBForm,
} from "react-bootstrap";
import IconLock from "@components/common/icons/lock/Lock";
import IconEmail from "@components/common/icons/email/Email";
import Style from "@components/pages/main/LoginModal.module.scss";
import Link from "@components/common/link/Link";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import { modalClose } from "@redux/reducer/Popup";
import StyleLink from "@components/common/link/Link.module.scss";

export const LoginModal: React.FC = function () {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.popup.modal.login.show);

  function handleClose() {
    dispatch(
      modalClose({
        modal: "login",
      })
    );
  }

  return (
    <>
      <Modal centered={true} show={show} handleClose={handleClose}>
        <ModalHeader
          header={"Войти"}
          subheader={"Авторизуйтесь чтобы играть и выигрывать"}
          handleClose={handleClose}
        />

        <ModalBody>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <IconEmail className={Style.inputGroupIcon} />
            </InputGroup.Text>
            <FormControl
              placeholder="E-mail"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <IconLock className={Style.inputGroupIcon} />
            </InputGroup.Text>
            <FormControl
              placeholder="Пароль"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

          <div className={cn(["d-flex", "justify-content-between", "mb-3"])}>
            <RBForm.Check
              type={"checkbox"}
              id={"remember-me"}
              label={"Запомнить меня"}
              className={Style.check}
            />

            <a href={"#"} className={cn([StyleLink.link, "font-calibri"])}>
              Забыли Пароль?
            </a>
          </div>

          <div
            className={cn([
              "d-flex",
              "justify-content-center",
              "mb-3",
              "font-calibri",
            ])}
          >
            <span className="form-text-helper">Нет аккаунта?</span>
            <a href={"#"} className={cn([StyleLink.link, "ms-1"])}>
              Регистрация
            </a>
          </div>

          <FormButton>Войти</FormButton>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
