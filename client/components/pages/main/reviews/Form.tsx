import * as React from "react";
import cn from "classnames";
import Styles from "@components/pages/main/reviews/Form.module.scss";
import * as Yup from "yup";
import { Form as FormikForm, Formik } from "formik";

export const Form: React.FC = function () {
  const initialValues = {
    text: "",
  };
  const maxLength = 300;

  const validationSchema = Yup.object().shape({
    text: Yup.string().required().min(30).max(maxLength),
  });

  function submit() {
    alert("Submit");
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, values, touched, isSubmitting, handleChange }) => (
          <FormikForm className="d-flex align-items-end flex-column">
            <div
              className={cn([
                Styles.input,
                Styles.textareaContainer,
                "position-relative mb-3 w-100",
              ])}
            >
              <textarea
                className={cn([Styles.textarea, "custom-scrollbar"])}
                name="text"
                cols={30}
                rows={4}
                placeholder="Текст отзыва ..."
                maxLength={maxLength}
                onChange={handleChange}
              />

              <span className={cn([Styles.textCounter, "position-absolute"])}>
                {values.text.length}/{maxLength}
              </span>

              {!!touched.text && errors.text}
            </div>

            <button
              className={cn([Styles.button, "w-auto"])}
              disabled={isSubmitting}
            >
              Отправить
            </button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default Form;
