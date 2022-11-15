import * as React from "react";
import Style from "@components/pages/account/partnership/Invitation.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import About from "@components/pages/account/partnership/about/About";
import { Formik, Form } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { useDispatch } from "react-redux";
import { acceptPartnership } from "@redux/actions/User";

export const Invitation: React.FC = function () {
  const initialValues = {};
  const dispatch = useDispatch();

  function submit(
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof values>
  ) {
    formikHelpers.setSubmitting(true);

    dispatch(
      acceptPartnership({
        callback() {
          formikHelpers.setSubmitting(false);
        },
      })
    );
  }

  return (
    <div>
      <h1>Партнёрская программа</h1>
      <p className={Style.info}>
        Ищите <span className={"fw-semibold"}>стабильный способ заработка</span>{" "}
        в интернете? Тогда вам повезло. Наш игровой проект предлагает широкий
        спектр возможностей по заработку. Для этого вам потребуется немного
        свободного времени, наличие интернета и желание!
      </p>

      <About />

      <div
        className={cn("d-flex", "flex-column", "align-items-center", "mt-5")}
      >
        <p className={cn(Style.info, "mb-0", "text-center", "fw-semibold")}>
          Вы не участвуете в программе партнёрства. Нажмите «Начать» и
          зарабатывайте вместе с нами.
        </p>

        <Formik initialValues={initialValues} onSubmit={submit}>
          {({ isSubmitting }) => {
            return (
              <Form>
                <FormButton
                  className={cn("mt-2", "w-auto")}
                  disabled={isSubmitting}
                  type={"submit"}
                >
                  начать
                </FormButton>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Invitation;
