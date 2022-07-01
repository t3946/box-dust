import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/pages/account/Account.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import balanceToString from "@utils/balanceToString";
import Panel from "@components/common/layout/account/Panel";
import Link from "next/link";

export const Account: React.FC = function () {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return null;
  }

  return (
    <Panel>
      <div className="d-flex flex-column flex-lg-row">
        <div
          className={cn(
            "d-flex",
            "justify-content-center",
            "justify-content-lg-start"
          )}
        >
          <img
            src={"/images/default-avatar.png"}
            alt="Аватар"
            className={Style.avatarImage}
          />
        </div>

        <div className={"ms-lg-5"}>
          <ul className={cn(Style.stat, "list-unstyled")}>
            <li
              className={cn(
                "mb-1",
                "mt-3",
                "mt-lg-0",
                "text-center",
                "text-lg-start"
              )}
            >
              <span className={cn(Style.userName, "mb-3")}>
                <span className={Style.userNameString}>{user.name}</span>
              </span>
            </li>

            <li className={cn("mb-1", "text-center", "text-lg-start")}>
              Почта: {user.email}
            </li>

            <li className={cn("mb-2", "text-center", "text-lg-start")}>
              <Link href={"/account/profile/edit"}>
                <a>
                  <FormButton className={"mt-2"}>редактировать</FormButton>
                </a>
              </Link>
            </li>
          </ul>

          <ul className={cn(Style.stat, "list-unstyled mt-3")}>
            <li className={cn("text-center", "text-lg-start")}>
              Призов на складе: 0
            </li>
            <li
              className={cn(
                Style.balance,
                "mt-2",
                "fw-bold",
                "text-center",
                "text-lg-start"
              )}
            >
              Баланс:{" "}
              <span className={Style.balanceNumber}>
                {balanceToString(user.balance)}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Panel>
  );
};

export default Account;
