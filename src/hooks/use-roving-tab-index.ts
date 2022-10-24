import { useState, useEffect, useRef, KeyboardEvent } from "react";

export const useRovingTabIndex = (
  lastTargetIndex: number,
  initialFocusIndex = 0
) => {
  const [focusTargetIndex, setFocusTargetIndex] =
    useState<number>(initialFocusIndex);

  const focusTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (focusTargetRef.current) {
      focusTargetRef.current.focus();
    }
  }, [focusTargetIndex, focusTargetRef]);

  const updateFocusTargetIndex = (index: number) => {
    let indexToFocus;
    if (index > lastTargetIndex) {
      indexToFocus = 0;
    } else if (index < 0) {
      indexToFocus = lastTargetIndex;
    } else {
      indexToFocus = index;
    }
    setFocusTargetIndex(indexToFocus);
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    let flag = false;
    switch (event.key) {
      case "ArrowDown":
        updateFocusTargetIndex(index + 1);
        flag = true;
        break;
      case "ArrowUp":
        updateFocusTargetIndex(index - 1);
        flag = true;
        break;
      case "Home":
        updateFocusTargetIndex(0);
        flag = true;
        break;
      case "End":
        updateFocusTargetIndex(lastTargetIndex);
        flag = true;
        break;
      default:
        break;
    }
    if (flag) {
      event.preventDefault();
    }
  };

  const setFocusTargetRef = (element: HTMLElement, index: number) => {
    if (index === focusTargetIndex) {
      focusTargetRef.current = element;
    }
  };

  const getTabIndex = (index: number) => {
    if (index === focusTargetIndex) {
      return 0;
    }
    return -1;
  };

  return {
    setFocusTargetRef,
    getTabIndex,
    handleKeyDown,
  };
};
