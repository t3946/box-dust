import * as React from "react";
import Image from "next/image";
import { avatars } from "@components/pages/account/edit/Avatars";
import Style from "@components/pages/account/edit/SelectAvatar.module.scss";
import cn from "classnames";

interface IProps {
  avatarType: string;
  onSelect: (avatar: string) => void;
}

export const SelectAvatar: React.FC<IProps> = function (props) {
  const { avatarType, onSelect } = props;
  const items = [];

  for (let i = 0; i < avatars.length; i++) {
    items.push(
      <div
        className={cn(Style.imageWrapper, {
          [Style.imageWrapper_active]: avatars[i].type === avatarType,
        })}
        key={`select-avatar-item-${i}`}
        onClick={() => onSelect(avatars[i].type)}
      >
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
