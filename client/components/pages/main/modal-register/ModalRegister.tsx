import * as React from "react";
import Modal from "@components/common/layout/modal/Modal";
import ModalHeader from "@components/common/layout/modal/ModalHeader";
import ModalBody from "@components/common/layout/modal/ModalBody";
import { InputGroup, FormControl, Form as RBForm } from "react-bootstrap";
import IconLock from "@components/common/icons/lock/Lock";
import IconEmail from "@components/common/icons/email/Email";
import IconUser from "@components/common/icons/user/User";
import Style from "@components/pages/main/modal-login/ModalLogin.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import { modalClose, modalOpen } from "@redux/reducer/Popup";
import StyleLink from "@components/common/link/Link.module.scss";

export const ModalRegister: React.FC = function () {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.popup.modal.register.show);

  function openLoginModal() {
    dispatch(
      modalOpen({
        modal: "login",
      })
    );
  }

  function closeRegisterModal() {
    dispatch(
      modalClose({
        modal: "register",
      })
    );
  }

  function handleClose() {
    dispatch(
      modalClose({
        modal: "register",
      })
    );
  }

  return (
    <>
      <Modal centered={true} show={show} handleClose={handleClose}>
        <ModalHeader
          header={"Регистрация"}
          subheader={"Зарегистрируйтесь, и получите один бесплатный спин!"}
          handleClose={handleClose}
        />

        <ModalBody>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <IconUser className={Style.inputGroupIcon} />
            </InputGroup.Text>
            <FormControl
              placeholder="Имя"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>

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
              type={"password"}
            />
          </InputGroup>

          <div className={cn(["d-flex", "justify-content-center", "mb-3"])}>
            <RBForm.Check
              type={"checkbox"}
              id={"remember-me"}
              label={
                <>
                  Я Принимаю Условия{" "}
                  <a href="#" className={cn([StyleLink.link, "font-calibri"])}>
                    Пользовательского Соглашения
                  </a>
                </>
              }
              className={Style.check}
            />
          </div>

          <div
            className={cn([
              "d-flex",
              "justify-content-center",
              "mb-3",
              "font-calibri",
            ])}
          >
            <span className="form-text-helper">Уже зарегистрированы?</span>
            <a
              href={"#"}
              className={cn([StyleLink.link, "ms-1"])}
              onClick={(e) => {
                e.stopPropagation();
                closeRegisterModal();
                setTimeout(openLoginModal, 150);
              }}
            >
              Войти
            </a>
          </div>

          <FormButton>Регистрация</FormButton>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalRegister;
