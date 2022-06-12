import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/pages/account/Account.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import EditableString from "@components/pages/account/EditableString";

export const Account: React.FC = function () {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return null;
  }

  return (
    <div className={"mt-3"}>
      <div className={cn(Style.userInfoPanel, "row m-lg-0")}>
        <div className="col d-flex flex-row">
          <div className={"d-flex flex-column"}>
            <img
              src={"/images/default-avatar.png"}
              alt=""
              className={Style.avatarImage}
            />
            <FormButton className={"mt-2"}>редактировать</FormButton>
          </div>

          <div className={"ms-5"}>
            <EditableString className={cn(Style.userName, "mb-3")}>
              <span className={Style.userNameString}>{user.name}</span>
            </EditableString>

            <ul className={cn(Style.stat, "list-unstyled m-0")}>
              <li>Призов на складе: 0</li>
              <li>Игр сыграно: 0</li>
              <li className={cn(Style.balance, "mt-2", "fw-bold")}>
                Баланс:{" "}
                <span className={Style.balanceNumber}>
                  {(user.balance / 100).toFixed(2).toLocaleString("Ru")}
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
