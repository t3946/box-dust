import * as React from "react";
import Navigation from "@components/common/layout/hat/Navigation";
import Styles from "@components/common/layout/hat/Hat.module.scss";
import cn from "classnames";
import ConvexButton from "@components/common/ui/convex-button/ConvexButton";
import { modalOpen } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import UserPanel from "@components/common/layout/hat/UserPanel";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuDesktop from "@components/common/layout/hat/MenuDesktop";
import HatMobile from "@components/common/layout/hat/mobile/HatMobile";
import ModalLogin from "@components/pages/main/modal-login/ModalLogin";
import ModalRegister from "@components/pages/main/modal-register/ModalRegister";

export const Hat: React.FC = function () {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  function openModalLogin() {
    dispatch(
      modalOpen({
        modal: "login",
      })
    );
  }

  return (
    <>
      <HatMobile className={["d-lg-none"]} />

      <header className={cn(Styles.hat, "d-none", "d-lg-grid")}>
        <div className="container">
          <div className={Styles.hatWrapper}>
            <Link href={"/"}>
              <img
                src={"/images/pages/main/logo.png"}
                alt={"site log"}
                className={Styles.logo}
              />
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

      {router.route !== "/account" && (
        <div className={cn([Styles.headerMenuPanel, "d-none", "d-lg-block"])}>
          <div className="container">
            <Navigation />
          </div>
        </div>
      )}

      <ModalLogin />
      <ModalRegister />
    </>
  );
};

export default Hat;
