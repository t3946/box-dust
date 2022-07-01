import { AnyAction } from "redux";

const initialState = {
  navigation: [
    { label: "Коробки", route: "/main#boxes" },
    { label: "Доставка", route: "/main#delivery" },
    { label: "Отзывы", route: "/main#reviews" },
    { label: "Контакты", route: "/main#contacts" },
  ],
  account: [
    {
      label: "Профиль",
      route: "/account/profile",
    },
    {
      label: "Склад",
      route: "/account/stock",
    },
    {
      label: "Баланс",
      route: "/account/payment",
    },
  ],
};

const Menu = (
  state: Record<any, any> = initialState,
  action: AnyAction
): Record<any, any> => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Menu;
