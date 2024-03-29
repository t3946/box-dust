import * as React from "react";
import Styles from "@components/common/layout/hat/Hat.module.scss";
import cn from "classnames";
import ConvexButton from "@components/common/ui/convex-button/ConvexButton";
import { modalOpen } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import UserPanel from "@components/common/layout/hat/UserPanel";
import Link from "next/link";
import MenuDesktop from "@components/common/layout/hat/MenuDesktop";
import HatMobile from "@components/common/layout/hat/mobile/HatMobile";
import ModalLogin from "@components/pages/main/modal-login/ModalLogin";
import ModalRegister from "@components/pages/main/modal-register/ModalRegister";

export const Hat: React.FC = function() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  function openModalLogin() {
    dispatch(
      modalOpen({
        modal: "login",
      }),
    );
  }

  return (
    <>
      <HatMobile className={["d-lg-none"]} />

      <header className={cn(Styles.hat, "d-none", "d-lg-grid")}>
        <div className="container">
          <div className={Styles.hatWrapper}>
            <Link href={"/"}>
              <a>
                <img
                  src={"/images/pages/main/logo.png"}
                  alt={"site log"}
                  className={Styles.logo}
                />
              </a>
            </Link>

            <div className="d-none d-lg-flex align-items-center justify-content-center">
              <MenuDesktop />
            </div>

            <div className={cn([Styles.headerUiColumn])}>
              {!user && (
                <ConvexButton
                  className={Styles.loginButton}
                  onClick={openModalLogin}
                >
                  Войти
                </ConvexButton>
              )}

              {user && <UserPanel />}
            </div>
          </div>
        </div>
      </header>

      <ModalLogin />
      <ModalRegister />
    </>
  );
};

export default Hat;
