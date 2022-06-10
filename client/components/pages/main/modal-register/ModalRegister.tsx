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
import { Formik } from "formik";
import { Form as FormikForm } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik/dist/types";
import { registration } from "@redux/actions/User";

export const ModalRegister: React.FC = function () {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.popup.modal.register.show);
  const initialValues = {
    username: "vava",
    login: "svailence@yandex.ru",
    password: "admin1",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(3).max(64),
    login: Yup.string().min(3).max(64),
    password: Yup.string().min(6).max(32),
  });

  function submit(
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof values>
  ) {
    console.log("submit");
    formikHelpers.setSubmitting(true);

    dispatch(
      registration({
        data: values,
        callback() {
          formikHelpers.setSubmitting(false);
          console.log("callback");
        },
      })
    );
  }

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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submit}
          >
            {({ errors, values, touched, isSubmitting, handleChange }) => {
              return (
                <FormikForm className="d-flex align-items-end flex-column">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <IconUser className={Style.inputGroupIcon} />
                    </InputGroup.Text>

                    <FormControl
                      id={"username"}
                      placeholder="Имя"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      value={values.username}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <IconEmail className={Style.inputGroupIcon} />
                    </InputGroup.Text>

                    <FormControl
                      id={"login"}
                      placeholder="E-mail"
                      aria-label="email"
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      value={values.login}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <IconLock className={Style.inputGroupIcon} />
                    </InputGroup.Text>

                    <FormControl
                      id={"password"}
                      placeholder="Пароль"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type={"password"}
                      onChange={handleChange}
                      value={values.password}
                    />
                  </InputGroup>

                  <div
                    className={cn([
                      "d-flex",
                      "w-100",
                      "justify-content-center",
                      "mb-3",
                    ])}
                  >
                    <RBForm.Check
                      type={"checkbox"}
                      id={"remember-me"}
                      label={
                        <>
                          Я Принимаю Условия{" "}
                          <a
                            href="#"
                            className={cn([StyleLink.link, "font-calibri"])}
                          >
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
                      "w-100",
                      "justify-content-center",
                      "mb-3",
                      "font-calibri",
                    ])}
                  >
                    <span className="form-text-helper">
                      Уже зарегистрированы?
                    </span>
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

                  <FormButton type={"button"}>Регистрация</FormButton>
                </FormikForm>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalRegister;
