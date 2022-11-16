import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/account/Sidebar.module.scss";
import { useRouter } from "next/router";
import IconLeft from "@components/common/icons/left/Solid";
import StyleSidebar from "@components/pages/account/Sidebar.module.scss";

export const LogoutButton: React.FC<any> = function (props) {
  const { className } = props;
  const router = useRouter();

  const goBack = () => {
    const backUrlWhiteList = ["/account/payment", "/account/stock"];
    const defaultUrl = "/account/profile";

    if (props.referer) {
      for (const url of backUrlWhiteList) {
        if (props.referer.endsWith(url)) {
          router.push(url);
          return;
        }
      }
    }

    router.push(defaultUrl);
  };

  return (
    <div onClick={goBack} className={cn(Style.sidebar_item, className)}>
      <span className={cn(Style.item, Style.item__logout)}>
        <span className={StyleSidebar.icon}>
          <IconLeft />
        </span>

        <span>Назад</span>
      </span>
    </div>
  );
};

export default LogoutButton;
