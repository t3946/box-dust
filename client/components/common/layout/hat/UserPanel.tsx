import * as React from "react";
import Style from "@components/common/layout/hat/UserPanel.module.scss";
import useSelector from "@hooks/useSelector";
import cn from "classnames";
import ChevronDown from "@components/common/icons/chevron-down/ChevronDown";
import Link from "next/link";
import balanceToString from "@utils/balanceToString";

export const UserPanel: React.FC = function () {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={"d-flex w-100 justify-content-end"}>
      <Link href={"/account/profile"}>
        <a>
          {" "}
          <div
            className={cn(
              "d-flex align-items-center cursor-pointer",
              Style.buttonWrapper
            )}
          >
            <div className={cn(Style.avatarImageContainer, "flex-shrink-0")}>
              <img
                src={"/images/default-avatar.png"}
                className={Style.avatarImage}
              />
            </div>

            <div
              className={cn("mx-3", "d-flex", "flex-column")}
            >
              <span className={Style.userName}>{user.name}</span>
              <span className={Style.balance}>
                баланс:{" "}
                <span className={Style.balanceNumber}>
                  {balanceToString(user.balance)}
                </span>
              </span>
            </div>

            <ChevronDown className={cn("flex-shrink-0", Style.chevron)} />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default UserPanel;
