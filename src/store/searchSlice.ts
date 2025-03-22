import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComplexRange {
  level: [number, number];
  DS: [number, number];
  DE: [number, number];
  DA: [number, number];
}

interface SearchState {
  searchQuery: string;
  activeModal: string | null;
  complexRange: ComplexRange;
  publishedDateRange: [string | null, string | null];
  modifiedDateRange: [string | null, string | null];
  hasInteractedPublished: boolean;
  hasInteractedModified: boolean;
  hasInteractedComplex: boolean;
}

const initialState: SearchState = {
  searchQuery: '',
  activeModal: null,
  complexRange: {
    level: [0, 4],
    DS: [0, 4],
    DE: [0, 4],
    DA: [0, 4],
  },
  publishedDateRange: [null, null],
  modifiedDateRange: [null, null],
  hasInteractedPublished: false,
  hasInteractedModified: false,
  hasInteractedComplex: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearchState: () => {
      return initialState;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    setComplexRange: (state, action: PayloadAction<{ type: keyof ComplexRange; newRange: [number, number] }>) => {
      const { type, newRange } = action.payload;
      state.complexRange[type] = newRange;
      state.hasInteractedComplex = true;
    },
    setPublishedDateRange: (state, action: PayloadAction<[string | null, string | null]>) => {
      state.publishedDateRange = action.payload;
      state.hasInteractedPublished = true;
    },
    setModifiedDateRange: (state, action: PayloadAction<[string | null, string | null]>) => {
      state.modifiedDateRange = action.payload;
      state.hasInteractedModified = true;
    },
  },
});

export const {
  resetSearchState,
  setSearchQuery,
  setActiveModal,
  setComplexRange,
  setPublishedDateRange,
  setModifiedDateRange,
} = searchSlice.actions;

export default searchSlice.reducer;
