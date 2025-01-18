import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComplexRange {
  level: number[];
  DS: number[];
  DE: number[];
  DA: number[];
}

interface SearchState {
  searchQuery: string;
  activeModal: string | null;
  complexRange: ComplexRange;
  publishedDateRange: [Date | null, Date | null];
  modifiedDateRange: [Date | null, Date | null];
  selectedQuickSelect: 'all' | 'week' | 'month' | null;
  selectedModifiedQuickSelect: 'all' | 'week' | 'month' | null;
  hasInteractedPublished: boolean;
  hasInteractedModified: boolean;
  hasInteractedComplex: boolean;
}

const initialState: SearchState = {
  searchQuery: '',
  activeModal: null,
  complexRange: {
    level: [0,1,2,3,4],
    DS: [0,1,2,3,4],
    DE: [0,1,2,3,4],
    DA: [0,1,2,3,4],
  },
  publishedDateRange: [null, null],
  modifiedDateRange: [null, null],
  selectedQuickSelect: 'all',
  selectedModifiedQuickSelect: 'all',
  hasInteractedPublished: false,
  hasInteractedModified: false,
  hasInteractedComplex: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    setComplexRange: (state, action: PayloadAction<{ type: keyof ComplexRange; newRange: number[] }>) => {
      const { type, newRange } = action.payload;
      state.complexRange[type] = newRange;
      state.hasInteractedComplex = true;
    },
    setPublishedDateRange: (state, action: PayloadAction<[Date | null, Date | null]>) => {
      state.publishedDateRange = action.payload;
      state.hasInteractedPublished = true;
    },
    setModifiedDateRange: (state, action: PayloadAction<[Date | null, Date | null]>) => {
      state.modifiedDateRange = action.payload;
      state.hasInteractedModified = true;
    },
    setSelectedQuickSelect: (state, action: PayloadAction<'all' | 'week' | 'month' | null>) => {
      state.selectedQuickSelect = action.payload;
    },
    setSelectedModifiedQuickSelect: (state, action: PayloadAction<'all' | 'week' | 'month' | null>) => {
      state.selectedModifiedQuickSelect = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setActiveModal,
  setComplexRange,
  setPublishedDateRange,
  setModifiedDateRange,
  setSelectedQuickSelect,
  setSelectedModifiedQuickSelect,
} = searchSlice.actions;

export default searchSlice.reducer;
