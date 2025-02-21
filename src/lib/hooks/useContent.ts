import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import {
  addItem,
  updateItem,
  setItems,
  setCurrentItem,
  ContentItem,
} from "@/lib/store/slices/contentSlice";

export function useContent() {
  const dispatch = useAppDispatch();
  const { items, currentItem, loading, error } = useAppSelector(
    (state) => state.content
  );

  const createContent = useCallback(
    (type: ContentItem["type"], title: string) => {
      const newItem: ContentItem = {
        id: crypto.randomUUID(),
        type,
        title,
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        metadata: {},
        workflowState: {
          currentStep: 1,
          totalSteps:
            type === "blog"
              ? 4
              : type === "video"
              ? 3
              : type === "reel"
              ? 3
              : 2,
          stepStatus: {},
        },
      };

      dispatch(addItem(newItem));
      return newItem;
    },
    [dispatch]
  );

  const updateContent = useCallback(
    (content: ContentItem) => {
      dispatch(
        updateItem({
          ...content,
          updatedAt: new Date().toISOString(),
        })
      );
    },
    [dispatch]
  );

  const updateWorkflowState = useCallback(
    (contentId: string, step: number, status: string) => {
      const content = items.find((item) => item.id === contentId);
      if (!content) return;

      dispatch(
        updateItem({
          ...content,
          workflowState: {
            ...content.workflowState,
            currentStep: step,
            stepStatus: {
              ...content.workflowState.stepStatus,
              [step]: status,
            },
          },
          updatedAt: new Date().toISOString(),
        })
      );
    },
    [dispatch, items]
  );

  const setCurrentContent = useCallback(
    (content: ContentItem | null) => {
      dispatch(setCurrentItem(content));
    },
    [dispatch]
  );

  const getContentById = useCallback(
    (id: string) => {
      return items.find((item) => item.id === id);
    },
    [items]
  );

  const getContentByType = useCallback(
    (type: ContentItem["type"]) => {
      return items.filter((item) => item.type === type);
    },
    [items]
  );

  return {
    items,
    currentItem,
    loading,
    error,
    createContent,
    updateContent,
    updateWorkflowState,
    setCurrentContent,
    getContentById,
    getContentByType,
  };
}
