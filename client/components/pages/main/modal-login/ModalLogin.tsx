import * as React from "react";
import Modal from "@components/common/layout/modal/Modal";
import ModalHeader from "@components/common/layout/modal/ModalHeader";
import ModalBody from "@components/common/layout/modal/ModalBody";
import { InputGroup, FormControl, Form as RBForm } from "react-bootstrap";
import IconLock from "@components/common/icons/lock/Lock";
import IconEmail from "@components/common/icons/email/Email";
import Style from "@components/pages/main/modal-login/ModalLogin.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import { modalClose, modalOpen } from "@redux/reducer/Popup";
import StyleLink from "@components/common/link/Link.module.scss";
import { login } from "@redux/actions/User";
import * as Yup from "yup";
import { FormikHelpers } from "formik/dist/types";
import { Formik } from "formik";
import { Form as FormikForm } from "formik";

export const ModalLogin: React.FC = function () {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.popup.modal.login.show);
  const initialValues = {
    login: "svialence@yandex.ru",
    password: "admin1",
  };
  const validationSchema = Yup.object().shape({
    login: Yup.string().min(3).max(64),
    password: Yup.string().min(6).max(32),
  });

  function submit(
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof values>
  ) {
    formikHelpers.setSubmitting(true);

    dispatch(
      login({
        data: values,

        callback() {
          formikHelpers.setSubmitting(false);
        },
      })
    );
  }

  function closeLoginModal() {
    dispatch(
      modalClose({
        modal: "login",
      })
    );
  }

  function openRegisterModal() {
    dispatch(
      modalOpen({
        modal: "register",
      })
    );
  }

  return (
    <>
      <Modal centered={true} show={show} handleClose={closeLoginModal}>
        <ModalHeader
          header={"Войти"}
          subheader={"Авторизуйтесь чтобы играть и выигрывать"}
          handleClose={closeLoginModal}
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
                      <IconEmail className={Style.inputGroupIcon} />
                    </InputGroup.Text>
                    <FormControl
                      id="login"
                      placeholder="E-mail"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={values.login}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                      <IconLock className={Style.inputGroupIcon} />
                    </InputGroup.Text>

                    <FormControl
                      id={"password"}
                      value={values.password}
                      placeholder="Пароль"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      type={"password"}
                      onChange={handleChange}
                    />
                  </InputGroup>

                  <div
                    className={cn([
                      "d-flex",
                      "justify-content-between",
                      "mb-3",
                      "w-100",
                    ])}
                  >
                    <RBForm.Check
                      type={"checkbox"}
                      id={"remember-me"}
                      label={"Запомнить меня"}
                      className={Style.check}
                    />

                    <a
                      href={"#"}
                      className={cn([StyleLink.link, "font-calibri"])}
                    >
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
                    <a
                      href={"#"}
                      className={cn([StyleLink.link, "ms-1"])}
                      onClick={(e) => {
                        e.stopPropagation();
                        closeLoginModal();
                        setTimeout(openRegisterModal, 150);
                      }}
                    >
                      Регистрация
                    </a>
                  </div>

                  <FormButton type={"submit"}>Войти</FormButton>
                </FormikForm>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalLogin;
