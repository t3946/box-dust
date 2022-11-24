import * as React from "react";
import Panel from "@components/common/layout/account/Panel";
import FormButton from "@components/common/form/button/Button";
import RBForm from "react-bootstrap/Form";
import * as Yup from "yup";
import { Form as FormikForm, Formik } from "formik";
import useSelector from "@hooks/useSelector";
import { FormikHelpers } from "formik/dist/types";
import Image from "next/image";
import SelectAvatar from "@components/pages/account/edit/SelectAvatar";
import { getAvatar } from "@components/pages/account/edit/Avatars";
import Style from "@components/pages/account/edit/Edit.module.scss";
import cn from "classnames";
import IconEdit from "@components/common/icons/edit/Edit";

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
  const [isSelectAvatar, setIsSelectAvatar] = React.useState(false);

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
          return (
            <FormikForm>
              <RBForm.Group className="mb-3" controlId="controlName">
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

              <RBForm.Group className="mb-3" controlId="controlEmail">
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

              <RBForm.Group className="mb-3" controlId="controlAvatar">
                <RBForm.Label>Аватар</RBForm.Label>

                <div className={Style.changeAvatarGroup}>
                  <div className={Style.avatarWrapper}>
                    <Image
                      src={getAvatar(user.avatar)}
                      alt="Аватар"
                      width={250}
                      height={250}
                      priority={true}
                      onClick={() => setIsSelectAvatar(!isSelectAvatar)}
                    />

                    <div
                      className={cn(
                        Style.selectAvatarButton,
                        Style.avatarWrapper_button
                      )}
                    >
                      <span>Выбрать аватар</span>
                      <IconEdit
                        className={cn(Style.selectAvatarIcon, "ms-2")}
                      />
                    </div>
                  </div>

                  <div className={"d-flex"}>
                    <div
                      className={cn(
                        Style.selectAvatarWrapper,
                        "custom-scrollbar-light"
                      )}
                    >
                      {isSelectAvatar && <SelectAvatar />}
                    </div>
                  </div>
                </div>
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
