import defaultAvatar from "@resources/images/user-avatrs/default.png";
import avatar1 from "@resources/images/user-avatrs/1.jpg";
import avatar2 from "@resources/images/user-avatrs/2.jpg";
import avatar3 from "@resources/images/user-avatrs/3.jpg";
import avatar4 from "@resources/images/user-avatrs/4.jpg";
import avatar5 from "@resources/images/user-avatrs/5.jpg";
import avatar6 from "@resources/images/user-avatrs/6.jpg";
import avatar7 from "@resources/images/user-avatrs/7.jpg";
import avatar8 from "@resources/images/user-avatrs/8.jpg";
import avatar9 from "@resources/images/user-avatrs/9.jpg";
import avatar10 from "@resources/images/user-avatrs/10.jpg";
import avatar11 from "@resources/images/user-avatrs/11.jpg";
import avatar12 from "@resources/images/user-avatrs/12.jpg";
import avatar13 from "@resources/images/user-avatrs/13.jpg";
import avatar14 from "@resources/images/user-avatrs/14.jpg";
import avatar15 from "@resources/images/user-avatrs/15.jpg";
import avatar16 from "@resources/images/user-avatrs/16.jpg";
import avatar17 from "@resources/images/user-avatrs/17.jpg";
import avatar18 from "@resources/images/user-avatrs/18.jpg";
import avatar19 from "@resources/images/user-avatrs/19.jpg";
import avatar20 from "@resources/images/user-avatrs/20.jpg";
import avatar21 from "@resources/images/user-avatrs/21.jpg";
import avatar22 from "@resources/images/user-avatrs/22.jpg";
import avatar23 from "@resources/images/user-avatrs/23.jpg";
import avatar24 from "@resources/images/user-avatrs/24.jpg";
import avatar25 from "@resources/images/user-avatrs/25.jpg";
import avatar26 from "@resources/images/user-avatrs/26.jpg";
import avatar27 from "@resources/images/user-avatrs/27.jpg";
import avatar28 from "@resources/images/user-avatrs/28.jpg";
import avatar29 from "@resources/images/user-avatrs/29.jpg";
import avatar30 from "@resources/images/user-avatrs/30.jpg";
import avatar31 from "@resources/images/user-avatrs/31.jpg";
import avatar32 from "@resources/images/user-avatrs/32.jpg";
import avatar33 from "@resources/images/user-avatrs/33.jpg";
import avatar34 from "@resources/images/user-avatrs/34.jpg";
import avatar35 from "@resources/images/user-avatrs/35.jpg";

export const avatars = [
  { type: "default", avatar: defaultAvatar },
  { type: "1", avatar: avatar1 },
  { type: "2", avatar: avatar2 },
  { type: "3", avatar: avatar3 },
  { type: "4", avatar: avatar4 },
  { type: "5", avatar: avatar5 },
  { type: "6", avatar: avatar6 },
  { type: "7", avatar: avatar7 },
  { type: "8", avatar: avatar8 },
  { type: "9", avatar: avatar9 },
  { type: "10", avatar: avatar10 },
  { type: "11", avatar: avatar11 },
  { type: "12", avatar: avatar12 },
  { type: "13", avatar: avatar13 },
  { type: "14", avatar: avatar14 },
  { type: "15", avatar: avatar15 },
  { type: "16", avatar: avatar16 },
  { type: "17", avatar: avatar17 },
  { type: "18", avatar: avatar18 },
  { type: "19", avatar: avatar19 },
  { type: "20", avatar: avatar20 },
  { type: "21", avatar: avatar21 },
  { type: "22", avatar: avatar22 },
  { type: "23", avatar: avatar23 },
  { type: "24", avatar: avatar24 },
  { type: "25", avatar: avatar25 },
  { type: "26", avatar: avatar26 },
  { type: "27", avatar: avatar27 },
  { type: "28", avatar: avatar28 },
  { type: "29", avatar: avatar29 },
  { type: "30", avatar: avatar30 },
  { type: "31", avatar: avatar31 },
  { type: "32", avatar: avatar32 },
  { type: "33", avatar: avatar33 },
  { type: "34", avatar: avatar34 },
  { type: "35", avatar: avatar35 },
];

export const getAvatar = (type: string) => {
  let defaultAvatar;
  for (const item of avatars) {
    if (item.type === type) {
      return item.avatar;
    }

    if (item.type === "default") {
      defaultAvatar = item.avatar;
    }
  }

  return defaultAvatar;
};
