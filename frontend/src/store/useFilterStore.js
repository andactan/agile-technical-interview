import { create } from "zustand";

const useFilterStore = create((set) => ({
  filters: {
    name: null,
    continent: null,
    province: null,
    population__gte: null,
    population__lte: null,
    fertility_rate__gte: null,
    fertility_rate__lte: null,
  },
  orderBy: [],
  setFilters: (newFields) =>
    set((state) => ({ filters: { ...state.filters, ...newFields } })),
  setOrderBy: (orderBy) => set((state) => [...orderBy]),
}));

export default useFilterStore;
