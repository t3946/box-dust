import Head from "next/head";
import React, { useEffect } from "react";
import Account from "@components/pages/account/Account";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import Sidebar from "@components/pages/account/Sidebar";

export default function Page() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user && router) {
      router.push("/main");
    }
  });

  return (
    <>
      <Head>
        <title>Профиль</title>
      </Head>

      <div className={"mt-3"}>
        <div className="row">
          <div className="col-2 pe-1">
            <Sidebar />
          </div>

          <div className="col-10">
            <Account />
          </div>
        </div>
      </div>
    </>
  );
}
