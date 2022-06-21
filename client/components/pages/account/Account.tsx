import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/pages/account/Account.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import balanceToString from "@utils/balanceToString";
import { update } from "@redux/actions/User";

export const Account: React.FC = function () {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className={cn(Style.userInfoPanel, "row m-lg-0")}>
        <div className="col d-flex flex-row">
          <div className={"d-flex flex-column"}>
            <img
              src={"/images/default-avatar.png"}
              alt="Аватар"
              className={Style.avatarImage}
            />
          </div>

          <div className={"ms-5"}>
            <ul className={cn(Style.stat, "list-unstyled")}>
              <li className={"mb-1"}>
                <span className={cn(Style.userName, "mb-3")}>
                  <span className={Style.userNameString}>{user.name}</span>
                </span>
              </li>
              <li className={"mb-1"}>Почта: {user.email}</li>
              <li className={"mt-2"}>
                <FormButton className={"mt-2"}>редактировать</FormButton>
              </li>
            </ul>

            <ul className={cn(Style.stat, "list-unstyled mt-3")}>
              <li>Призов на складе: 0</li>
              <li>Игр сыграно: 0</li>
              <li className={cn(Style.balance, "mt-2", "fw-bold")}>
                Баланс:{" "}
                <span className={Style.balanceNumber}>
                  {balanceToString(user.balance)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
