import { createSelector } from "reselect";
import IStore from "@redux/ts/IStore";

const selectUser = (state: IStore) => state.user.user;
const selectAllPartnerships = (state: IStore) => state.partnerships;

export default createSelector(
  [selectAllPartnerships, selectUser],
  (partnerships, user) => {
    const currentPartnership = partnerships.find(
      (e) => (e.partnership_id = user.partnership_id)
    );

    if (!currentPartnership) {
      return null;
    }

    switch (currentPartnership.slug) {
      case "basic_partner_1":
        return partnerships.find((e) => e.slug === "basic_partner_2");
      case "basic_partner_2":
        return partnerships.find((e) => e.slug === "basic_partner_3");
      case "basic_partner_3":
        return partnerships.find((e) => e.slug === "basic_partner_4");
    }

    return null;
  }
);
