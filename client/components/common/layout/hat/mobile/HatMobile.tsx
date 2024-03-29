import * as React from "react";
import HatStyle from "@components/common/layout/hat/Hat.module.scss";
import cn from "classnames";
import { modalOpen } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import Link from "next/link";
import MenuButton from "@components/common/layout/hat/mobile/MenuButton";
import Style from "@components/common/layout/hat/mobile/HatMobile.module.scss";
import Sidebar from "@components/common/layout/hat/mobile/Sidebar";
import IconUser from "@components/common/icons/user/Solid";
import { getAvatar } from "@components/pages/account/edit/Avatars";
import Image from "next/image";

export interface IProps {
  className?: any;
}

export const HatMobile: React.FC<IProps> = function(props) {
  const { className } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  function openModalLogin() {
    dispatch(
      modalOpen({
        modal: "login",
      }),
    );
  }

  const [showSidebar, setShowSidebar] = React.useState(false);

  function openMenu() {
    setShowSidebar(!showSidebar);
  }

  function userPreview() {
    if (user) {
      return (
        <Link href={"/account/profile"}>
          <a>
            <Image
              src={getAvatar(user.avatar)}
              alt="Аватар"
              width={60}
              height={60}
              className={cn(Style.avatar, "user-select-none", "user-drag-none")}
              suppressHydrationWarning={true}
            />
          </a>
        </Link>
      );
    }

    return (
      <span onClick={openModalLogin}>
        <IconUser className={Style.loginIcon} />
      </span>
    );
  }

  return (
    <>
      <header className={cn(Style.hat__wrapper, className)}>
        <div className={cn(HatStyle.hat, "row", "py-2", Style.hat)}>
          <div
            className="col-auto d-flex align-items-center"
            onClick={openMenu}
          >
            <MenuButton show={showSidebar} />
          </div>

          <div className="col d-flex justify-content-center align-items-center">
            <Link href={"/"}>
              <a>
                <img
                  src={"/images/pages/main/logo.png"}
                  alt={"box dust"}
                  className={cn(
                    HatStyle.logo,
                    "mw-100",
                    "h-auto",
                    Style.logo,
                    "user-select-none",
                    "user-drag-none",
                  )}
                />
              </a>
            </Link>
          </div>
          <div className={cn(["col-auto", "align-items-center", "d-flex"])}>
            {userPreview()}
          </div>
        </div>

        <Sidebar
          visible={showSidebar}
          className={"row"}
          setShowSidebar={setShowSidebar}
        />
      </header>
    </>
  );
};

export default HatMobile;
