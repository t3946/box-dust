import * as React from "react";
import { Formik } from "formik";
import { Form as FormikForm } from "formik";
import { Form as RBForm, FormControl, InputGroup } from "react-bootstrap";
import IconUser from "@components/common/icons/user/User";
import Style from "@components/pages/main/modal-login/ModalLogin.module.scss";
import IconEmail from "@components/common/icons/email/Email";
import Feedback from "@components/common/form/feedback/Feedback";
import IconLock from "@components/common/icons/lock/Lock";
import cn from "classnames";
import StyleLink from "@components/common/link/Link.module.scss";
import FormButton from "@components/common/form/button/Button";
import * as Yup from "yup";
import { FormikHelpers } from "formik/dist/types";
import { registration } from "@redux/actions/User";
import { useDispatch } from "react-redux";
import { modalClose, modalOpen } from "@redux/reducer/Popup";
import { Stages } from "@components/pages/main/modal-register/ModalRegister";

export interface IProps {
  setStage: any;
  setEmail: any;
}

export const RegisterForm: React.FC<IProps> = function (props) {
  const { setStage, setEmail } = props;
  const dispatch = useDispatch();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    applyAgreement: false,
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Введите имя пользователя").min(3).max(64),
    email: Yup.string().required("Введите email").email("Email не корректен"),
    password: Yup.string()
      .required("Введите пароль")
      .min(6, "Минимальная длина пароля 6 символов")
      .max(32, "Максимальная длина пароля 32 символа"),
    applyAgreement: Yup.bool().oneOf(
      [true],
      "Вы должны принять пользовательское соглашение"
    ),
  });

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

  function submit(
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof values>
  ) {
    formikHelpers.setSubmitting(true);

    dispatch(
      registration({
        data: {
          name: values.username,
          email: values.email,
          password: values.password,
          applyAgreement: values.applyAgreement,
        },
        callback(res) {
          if (res.errors) {
            formikHelpers.setErrors(res.errors);
          } else {
            setStage(Stages.SEND_CONFIRM_EMAIL);
            setEmail(values.email);
          }

          formikHelpers.setSubmitting(false);
        },
      })
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({
        errors,
        values,
        touched,
        isSubmitting,
        setFieldValue,
        handleChange,
      }) => {
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

              {touched.username && errors.username && (
                <Feedback message={errors.username} type={"invalid"} />
              )}
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <IconEmail className={Style.inputGroupIcon} />
              </InputGroup.Text>

              <FormControl
                id={"email"}
                placeholder="E-mail"
                aria-label="email"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                value={values.email}
              />

              {touched.email && errors.email && (
                <Feedback message={errors.email} type={"invalid"} />
              )}
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

              {touched.password && errors.password && (
                <Feedback message={errors.password} type={"invalid"} />
              )}
            </InputGroup>

            <div
              className={cn([
                "d-flex",
                "w-100",
                "justify-content-center",
                "mb-3",
              ])}
            >
              <div>
                <RBForm.Check
                  type={"checkbox"}
                  id={"remember-me"}
                  checked={values.applyAgreement}
                  onChange={(e) => {
                    setFieldValue("applyAgreement", e.target.checked);
                  }}
                  label={
                    <>
                      Я Принимаю Условия{" "}
                      <a
                        href="/user-agreement"
                        className={cn([StyleLink.link, "font-calibri"])}
                        target={"_blank"}
                      >
                        Пользовательского Соглашения
                      </a>
                    </>
                  }
                  className={Style.check}
                />
                <div className={"text-center"}>
                  {touched.applyAgreement && errors.applyAgreement && (
                    <Feedback
                      message={errors.applyAgreement}
                      type={"invalid"}
                    />
                  )}
                </div>
              </div>
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

            <FormButton type={"submit"}>Регистрация</FormButton>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
