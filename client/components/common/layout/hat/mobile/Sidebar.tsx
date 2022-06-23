import * as React from "react";
import Style from "@components/common/layout/hat/mobile/Sidebar.module.scss";
import { useEffect, useRef } from "react";
import cn from "classnames";
import UserPanel from "@components/common/layout/hat/UserPanel";
import useSelector from "@hooks/useSelector";

interface IProps {
  className: any;
  visible: boolean;
}

export const Sidebar: React.FC<IProps> = function (props: IProps) {
  const { className } = props;
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

  return (
    <div
      ref={refContainer}
      className={cn(
        Style.container,
        { [Style.container_show]: props.visible },
        className
      )}
    >
      {!!user && <UserPanel />}
    </div>
  );
};

export default Sidebar;
