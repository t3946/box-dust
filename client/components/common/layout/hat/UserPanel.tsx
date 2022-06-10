import * as React from "react";
import Style from "@components/common/layout/hat/UserPanel.module.scss";
import useSelector from "@hooks/useSelector";
import cn from "classnames";
import ChevronDown from "@components/common/icons/chevron-down/ChevronDown";

export const UserPanel: React.FC = function () {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={"d-flex w-100 justify-content-end"}>
      <div className={cn("d-flex align-items-center cursor-pointer", Style.buttonWrapper)}>
        <div className={cn(Style.avatarImageContainer, "flex-shrink-0")}>
          <img
            src={"/images/default-avatar.png"}
            className={Style.avatarImage}
          />
        </div>

        <span className={cn(Style.userName, "mx-3")}>{user.name}</span>

        <ChevronDown className={cn("flex-shrink-0", Style.chevron)} />
      </div>
    </div>
  );
};

export default UserPanel;
