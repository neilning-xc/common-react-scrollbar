import { useState, useEffect } from 'react';

interface ScrollbarStatus {
  width: number | undefined;
  height: number | undefined;
  innerRef: React.RefObject<HTMLElement | null>;
}

export const useScrollbarStatus = (data: ScrollbarStatus) => {
  const { width, height, innerRef } = data;

  const [shouldShowVerticval, setShouldShowVerticval] =
    useState<boolean>(false);
  const [shouldShowHorizontal, setShouldShowHorizontal] =
    useState<boolean>(false);

  useEffect(() => {
    const inner = innerRef.current;
    if (inner) {
      if (height === undefined) {
        setShouldShowVerticval(false);
      } else if (inner.clientHeight <= height) {
        setShouldShowVerticval(false);
      } else {
        setShouldShowVerticval(true);
      }

      if (width === undefined) {
        setShouldShowHorizontal(false);
      } else if (inner.clientWidth <= width) {
        setShouldShowHorizontal(false);
      } else {
        setShouldShowHorizontal(true);
      }
    }
  }, [innerRef.current, height, width]);

  return {
    shouldShowVerticval,
    shouldShowHorizontal,
  };
};
