import * as React from "react";
import FormButton from "@components/common/form/button/Button";
import { sendConfirmEmail } from "@redux/actions/User";
import { Stages } from "@components/pages/main/modal-register/ModalRegister";
import { useDispatch } from "react-redux";
import Feedback from "@components/common/form/feedback/Feedback";

export interface IProps {
  email: string;
  setStage: any;
}

export const SendConfirmEmail: React.FC<IProps> = function (props) {
  const { email, setStage } = props;
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);

  function submit() {
    dispatch(
      sendConfirmEmail({
        data: {
          email: email,
        },
        callback(res) {
          if (res.erros) {
            setError(true);
          }

          setStage(Stages.CONFIRM_EMAIL);
        },
      })
    );
  }

  return (
    <div>
      {error && (
        <Feedback
          message={"Произошла ошибка регистрации. Попробуйте ещё раз."}
          type={"invalid"}
          className={"mt-0 mb-3 text-center"}
        />
      )}

      <FormButton
        type={"button"}
        className={"text-transform-none"}
        onClick={submit}
      >
        Отправить код
      </FormButton>
    </div>
  );
};

export default SendConfirmEmail;
