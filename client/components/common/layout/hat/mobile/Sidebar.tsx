import * as React from "react";
import Style from "@components/common/layout/hat/mobile/Sidebar.module.scss";
import { useEffect, useRef } from "react";
import cn from "classnames";
import UserPanel from "@components/common/layout/hat/UserPanel";
import useSelector from "@hooks/useSelector";
import ConvexButton from "@components/common/ui/convex-button/ConvexButton";
import Menu from "@components/common/layout/hat/mobile/Menu";
import MenuAccount from "@components/common/layout/hat/mobile/MenuAccount";

interface IProps {
  className?: any;
  visible: boolean;
  setShowSidebar?: any;
}

export const Sidebar: React.FC<IProps> = function (props: IProps) {
  const { className, setShowSidebar } = props;
  const refContainer = useRef<any>();
  const user = useSelector((state) => state.user.user);

  function resizeMenu() {
    if (typeof window === "undefined") {
      return;
    }

    const hatHeight = 86;
    refContainer.current.style.height = window.innerHeight - hatHeight + "px";
  }

  useEffect(() => {
    resizeMenu();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeMenu);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", resizeMenu);
      }
    };
  });

  function loginPanelTemplate() {
    if (user) {
      return (
        <div>
          <UserPanel className={[Style.loginButtonContainer, "py-0"]} />
          <MenuAccount
            onClick={() => {
              setShowSidebar(false);
            }}
          />
          <div className={Style.menuDivider}></div>
        </div>
      );
    }

    return (
      <div className={Style.loginButtonContainer}>
        <ConvexButton className={cn("w-100", Style.loginButton)}>
          войти
        </ConvexButton>
      </div>
    );
  }

  return (
    <div
      ref={refContainer}
      className={cn(
        Style.container,
        { [Style.container_show]: props.visible },
        className
      )}
    >
      <div className={"p-0"}>
        {loginPanelTemplate()}

        <Menu
          onClick={() => {
            setShowSidebar(false);
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
