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
        item: Record<any, any>;
      };
    };
  };
  user: {
    user: Record<any, any>;
  };
}
