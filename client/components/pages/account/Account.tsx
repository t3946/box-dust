import * as React from "react";
import useSelector from "@hooks/useSelector";
import Style from "@components/pages/account/Account.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import balanceToString from "@utils/balanceToString";
import Panel from "@components/common/layout/account/Panel";
import Link from "next/link";
import Image from "next/image";
import { getAvatar } from "@components/pages/account/edit/Avatars";

export const Account: React.FC = function () {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return null;
  }

  return (
    <>
      <Panel>
        <div className={Style.content}>
          <div>
            <Image
              src={getAvatar(user.avatar)}
              alt="Аватар"
              width={240}
              height={240}
              className={cn(Style.avatar, "user-select-none", "user-drag-none")}
            />
          </div>

          <div>
            <div
              className={cn("mt-3", "mt-lg-0", "text-center", "text-lg-start")}
            >
              <span className={cn(Style.userName, "mb-3")}>
                <span className={Style.userNameString}>{user.name}</span>
              </span>
            </div>

            <div
              className={cn(
                Style.balance,
                Style.stat,
                "fw-bold",
                "text-center",
                "text-lg-start"
              )}
            >
              Баланс:{" "}
              <span className={Style.balanceNumber}>
                {balanceToString(user.balance)}
              </span>
            </div>

            <div className={cn("mt-3", "text-center", "text-lg-start")}>
              <Link href={"/account/profile/edit"}>
                <a>
                  <FormButton className={"w-auto"}>редактировать</FormButton>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
};

export default Account;
