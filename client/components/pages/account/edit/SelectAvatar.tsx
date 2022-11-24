import * as React from "react";
import Image from "next/image";
import { avatars } from "@components/pages/account/edit/Avatars";
import Style from "@components/pages/account/edit/SelectAvatar.module.scss";

export const SelectAvatar: React.FC = function () {
  const items = [];

  for (let i = 0; i < avatars.length; i++) {
    items.push(
      <div className={Style.imageWrapper} key={`select-avatar-item-${i}`}>
        <Image
          src={avatars[i].avatar}
          alt="Аватар"
          width={100}
          height={100}
          className={Style.avatarImage}
        />
      </div>
    );
  }

  return (
    <div>
      <div className={Style.grid}>{items}</div>
    </div>
  );
};

export default SelectAvatar;
