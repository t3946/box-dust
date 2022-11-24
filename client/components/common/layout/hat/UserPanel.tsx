import * as React from "react";
import Style from "@components/common/layout/hat/UserPanel.module.scss";
import useSelector from "@hooks/useSelector";
import cn from "classnames";
import ChevronDown from "@components/common/icons/chevron-down/ChevronDown";
import balanceToString from "@utils/balanceToString";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAvatar } from "@components/pages/account/edit/Avatars";

interface IProps {
  onToggle?: any;
  className?: any;
}

export const UserPanel: React.FC<IProps> = function (props) {
  const { onToggle, className } = props;
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  console.log("COMPONENT: UserPanel");
  console.log(`Fields: name="${user.name}" avatar="${user.avatar}"`);

  function toggle() {
    //todo: dummy for menu drop down
    if (!onToggle) {
      router.push("/account/profile");
      return;
    }

    setOpen(!open);

    if (typeof onToggle === "function") {
      onToggle(!open);
    }
  }

  return (
    <div
      className={cn(
        "d-flex align-items-center cursor-pointer",
        Style.buttonWrapper,
        className
      )}
      onClick={toggle}
    >
      <div className={cn(Style.avatarImageContainer, "flex-shrink-0")}>
        <Image
          src={getAvatar(user.avatar)}
          alt="Аватар"
          width={48}
          height={48}
          className={cn(Style.avatar, "user-select-none", "user-drag-none")}
          suppressHydrationWarning={true}
        />
      </div>

      <div className={cn("ms-3", "d-flex", "flex-column", "flex-grow-1")}>
        <span className={Style.userName}>{user.name}</span>
        <span className={Style.balance}>
          баланс:{" "}
          <span className={Style.balanceNumber}>
            {balanceToString(user.balance)}
          </span>
        </span>
      </div>

      {onToggle && (
        <ChevronDown
          className={cn("flex-shrink-0", Style.chevron, {
            [Style.chevron_open]: open,
          })}
        />
      )}
    </div>
  );
};

export default UserPanel;
