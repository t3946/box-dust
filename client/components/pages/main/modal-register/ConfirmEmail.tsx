import * as React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Form as FormikForm } from "formik";
import { FormControl, InputGroup } from "react-bootstrap";
import FormButton from "@components/common/form/button/Button";
import { FormikHelpers } from "formik/dist/types";
import FormInfo from "@components/common/form/info/Info";
import Styles from "@components/pages/main/modal-register/ConfirmEmail.module.scss";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { confirmEmail } from "@redux/actions/User";
import { Stages } from "@components/pages/main/modal-register/ModalRegister";
import Feedback from "@components/common/form/feedback/Feedback";

export interface IProps {
  email: string;
  setStage: any;
}

export const ConfirmEmail: React.FC<IProps> = function (props) {
  const { email, setStage } = props;
  const dispatch = useDispatch();
  const initialValues = {
    code: "",
  };
  const validationSchema = Yup.object().shape({
    code: Yup.string().required("Введите код отправленный на ваш email").min(6, "Неверный код").max(6),
  });

  function submit(
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof values>
  ) {
    formikHelpers.setSubmitting(true);

    dispatch(
      confirmEmail({
        data: {
          code: values.code,
          email: email,
        },
        callback(res) {
          if (res.errors) {
            formikHelpers.setErrors(res.errors);
          } else {
            setStage(Stages.EMAIL_CONFIRMED);
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
      {({ errors, values, touched, isSubmitting, handleChange }) => {
        return (
          <>
            <FormikForm className="d-flex align-items-end flex-column">
              <InputGroup className="mb-3">
                <FormControl
                  id={"code"}
                  aria-label="code"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  value={values.code}
                  className={cn(Styles.inputConfirmationCode, "text-center")}
                  maxLength={6}
                  placeholder={"______"}
                />
                <Feedback
                  message={errors.code}
                  type={"invalid"}
                  className={"text-center"}
                />
              </InputGroup>

              <FormButton type={"submit"}>Подтвердить</FormButton>
            </FormikForm>
          </>
        );
      }}
    </Formik>
  );
};

export default ConfirmEmail;
