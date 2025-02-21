import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContentItem {
  id: string;
  type: "blog" | "video" | "reel" | "image";
  title: string;
  status: "draft" | "processing" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
  workflowState: {
    currentStep: number;
    totalSteps: number;
    stepStatus: Record<string, any>;
  };
}

interface ContentState {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  currentItem: ContentItem | null;
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
  currentItem: null,
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<ContentItem>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<ContentItem>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setCurrentItem: (state, action: PayloadAction<ContentItem | null>) => {
      state.currentItem = action.payload;
    },
    updateWorkflowState: (
      state,
      action: PayloadAction<{
        id: string;
        workflowState: ContentItem["workflowState"];
      }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.workflowState = action.payload.workflowState;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setItems,
  addItem,
  updateItem,
  setCurrentItem,
  updateWorkflowState,
} = contentSlice.actions;

export default contentSlice.reducer;
