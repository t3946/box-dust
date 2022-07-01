export default interface IStore {
  catalog: Record<any, any>[];
  categories: {
    selectedCategory: Record<any, any>;
  };
  history: Record<any, any>[];
  reviews: {
    list: Record<any, any>[];
  };
  popup: {
    modal: {
      login: {
        show: boolean;
      };
      register: {
        show: boolean;
      };
      stockItem: {
        show: boolean;
        stock_item_id: number;
      };
    };
  };
  user: {
    user: Record<any, any>;
  };
  stock: {
    stock: Record<any, any>[];
  };
  menu: Record<"account" | "navigation", { label: string; route: string }[]>;
}
