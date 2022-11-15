import * as React from "react";
import cn from "classnames";
import Style from "@components/pages/account/Sidebar.module.scss";
import { useRouter } from "next/router";

export const LogoutButton: React.FC = function () {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className={cn(Style.sidebar_item, "mb-3")}
    >
      <span className={cn(Style.item, Style.item__logout)}>Назад</span>
    </div>
  );
};

export default LogoutButton;
