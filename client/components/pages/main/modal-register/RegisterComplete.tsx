import * as React from "react";
import FormButton from "@components/common/form/button/Button";
import { useRouter } from "next/router";

export interface IProps {
  handleClose: any;
}

export const RegisterComplete: React.FC<IProps> = function (props) {
  const router = useRouter();
  const { handleClose } = props;

  function goToAccount() {
    handleClose();
    router.push("/account/profile");
  }

  return (
    <div>
      <FormButton type={"button"} onClick={goToAccount}>
        Продолжить
      </FormButton>
    </div>
  );
};

export default RegisterComplete;
