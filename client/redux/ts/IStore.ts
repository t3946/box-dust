export default interface IStore {
  catalog: Record<any, any>[];
  categories: {
    selectedCategory: Record<any, any>;
  };
}
