import * as React from "react";
import Panel from "@components/common/layout/account/Panel";
import FormButton from "@components/common/form/button/Button";
import RBForm from "react-bootstrap/Form";
import * as Yup from "yup";
import { Form as FormikForm, Formik } from "formik";
import useSelector from "@hooks/useSelector";
import { FormikHelpers } from "formik/dist/types";

export const Edit: React.FC = function () {
  const user = useSelector((state) => state.user.user);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(32),
    email: Yup.string().email().required(),
    password: Yup.string(),
  });
  const initialValues = {
    name: user.name,
    email: user.email,
    password: "",
  };

  function submit(
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof values>
  ) {
    formikHelpers.setSubmitting(true);
    console.log("submit");
  }

  return (
    <Panel>
      <h1>Редактировать профиль</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ values, isSubmitting, handleChange, setValues, errors }) => {
          console.log({ errors });
          return (
            <FormikForm>
              <RBForm.Group className="mb-3" controlId="formBasicEmail">
                <RBForm.Label>Имя</RBForm.Label>
                <RBForm.Control
                  name={"name"}
                  type="text"
                  placeholder="Введите имя пользователя"
                  value={values.name}
                  onChange={handleChange}
                />
                <RBForm.Text className="text-muted">
                  Видно другим пользователям
                </RBForm.Text>
              </RBForm.Group>

              <RBForm.Group className="mb-3" controlId="formBasicEmail">
                <RBForm.Label>E-mail адрес</RBForm.Label>
                <RBForm.Control
                  name={"email"}
                  type="email"
                  placeholder="Введите e-mail"
                  value={values.email}
                  onChange={handleChange}
                />
                <RBForm.Text className="text-muted">
                  Используется для авторизации
                </RBForm.Text>
              </RBForm.Group>

              <RBForm.Group className="mb-3" controlId="formBasicEmail">
                <RBForm.Label>Аватар</RBForm.Label>
                <div></div>
                <RBForm.Text className="text-muted">
                  Допустимые форматы: *.PNG, *.JPG, *.JPEG
                  <br />
                  Размер изображения: 400x400
                  <br />
                  Размер файла: до 2mb
                  <br />
                </RBForm.Text>
              </RBForm.Group>

              <h3>Безопасность</h3>

              <RBForm.Group className="mb-3" controlId="formBasicEmail">
                <RBForm.Label>Новый пароль</RBForm.Label>
                <RBForm.Control
                  name={"password"}
                  type="password"
                  placeholder=""
                  value={values.password}
                  onChange={handleChange}
                />
                <RBForm.Text className="text-muted">
                  Если вы не хотите менять пароль – оставьте это поле пустым
                </RBForm.Text>
              </RBForm.Group>

              <div className="mt-4">
                <FormButton
                  className={"w-auto"}
                  type={"submit"}
                  disabled={isSubmitting}
                >
                  сохранить
                </FormButton>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </Panel>
  );
};

export default Edit;
