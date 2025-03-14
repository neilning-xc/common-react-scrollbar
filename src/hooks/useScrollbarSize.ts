import { useState, useEffect, useRef } from 'react';

interface ScrollbarSize {
  width: number | undefined;
  height: number | undefined;
  innerRef: React.RefObject<HTMLElement | null>;
  outerRef: React.RefObject<HTMLElement | null>;
}

export const useScrollbarSize = (data: ScrollbarSize) => {
  const { width, height, innerRef, outerRef } = data;

  const [scrollHeight, setScrollHeight] = useState<number | string>(0);
  const [scrollWidth, setScrollWidth] = useState<number | string>(0);
  const scaleY = useRef<number>(0);
  const scaleX = useRef<number>(0);
  const outerRect = useRef<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });
  const innerRect = useRef<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    // calculate the height of the thumb
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (outer && inner) {
      outerRect.current = {
        height: outer.clientHeight,
        width: outer.clientWidth,
      };
      innerRect.current = {
        height: inner.clientHeight,
        width: inner.clientWidth,
      };

      // setTrackSize(outerRect.current.height - trackWidth * 2);
      // calculate the height and width of the thumb with percentage
      setScrollHeight((outer.clientHeight / inner.clientHeight) * 100 + '%');
      const thumbHeight =
        (outer.clientHeight / inner.clientHeight) * outer.clientHeight;
      scaleY.current =
        (innerRect.current.height - outerRect.current.height) /
        (outerRect.current.height - thumbHeight);

      setScrollWidth((outer.clientWidth / inner.clientWidth) * 100 + '%');
      const thumbWidth =
        (outer.clientWidth / inner.clientWidth) * outer.clientWidth;
      scaleX.current =
        (innerRect.current.width - outerRect.current.width) /
        (outerRect.current.width - thumbWidth);
    }
  }, [outerRef.current, innerRef.current, width, height]);

  return {
    scrollHeight,
    scrollWidth,
    scaleX,
    scaleY,
    outerRect,
    innerRect,
  };
};
