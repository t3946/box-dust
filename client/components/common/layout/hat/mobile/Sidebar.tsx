import * as React from "react";
import Style from "@components/common/layout/hat/mobile/Sidebar.module.scss";
import { useEffect, useRef } from "react";
import cn from "classnames";

export const Sidebar: React.FC = function (props) {
  const refContainer = useRef<any>();

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
  }, []);

  return (
    <div
      ref={refContainer}
      className={cn(Style.container, { [Style.container_show]: props.visible })}
    ></div>
  );
};

export default Sidebar;
