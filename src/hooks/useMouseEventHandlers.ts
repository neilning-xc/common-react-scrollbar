import { useRef } from 'react';

interface MouseEventHandlers {
  outerRef: React.RefObject<HTMLElement | null>;
  scaleY: React.RefObject<number>;
  scaleX: React.RefObject<number>;
  outerRect: React.RefObject<{ height: number; width: number }>;
  innerRect: React.RefObject<{ height: number; width: number }>;
  isRtl: boolean;
}

export const useMouseEventHandlers = (data: MouseEventHandlers) => {
  const { outerRef, scaleY, scaleX, outerRect, innerRect, isRtl } = data;

  const verticalMouseDown = useRef<boolean>(false);
  const horizontalMouseDown = useRef<boolean>(false);
  const startY = useRef<number>(0);
  const startX = useRef<number>(0);
  const startScrollTop = useRef<number>(0);
  const startScrollLeft = useRef<number>(0);

  // Hold the thumb and move it
  const handleVerticalThumbMouseDown = (e: React.MouseEvent) => {
    // prevent default behavior to prevent text selection
    e.preventDefault();
    // prevent event bubbling to prevent triggering the track click event
    e.stopPropagation();
    verticalMouseDown.current = true;
    startY.current = e.clientY;
    if (outerRef.current) {
      startScrollTop.current = outerRef.current.scrollTop;
    }
    // add move event on window, the mouse move out of the track area, it still works
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleHorizontalThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    horizontalMouseDown.current = true;
    startX.current = e.clientX;
    if (outerRef.current) {
      startScrollLeft.current = outerRef.current.scrollLeft;
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (verticalMouseDown.current) {
      const offsetY = e.clientY - startY.current;
      if (outerRef.current) {
        outerRef.current.scrollTop =
          startScrollTop.current + offsetY * scaleY.current;
      }
    }

    if (horizontalMouseDown.current) {
      const offsetX = e.clientX - startX.current;
      if (outerRef.current) {
        outerRef.current.scrollLeft =
          startScrollLeft.current + offsetX * scaleX.current;
      }
    }
  };

  const handleMouseUp = () => {
    if (verticalMouseDown.current) {
      verticalMouseDown.current = false;
      startY.current = 0;
      // remove event listener after finish to prevent other bugs
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    if (horizontalMouseDown.current) {
      horizontalMouseDown.current = false;
      startX.current = 0;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  };

  // click on the track
  const handleVerticalTrackMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { height: outerH } = outerRect.current;
    const { height: innerH } = innerRect.current;
    // get the offset of the click point from the top of the track
    const offset = e.clientY - e.currentTarget.getBoundingClientRect().top;
    const scrollTop = (offset / outerH) * innerH - outerH / 2;
    if (outerRef.current) {
      outerRef.current.scrollTop = scrollTop;
    }
  };

  const handleHorizontalTrackMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { width: outerW } = outerRect.current;
    const { width: innerW } = innerRect.current;
    let offset;
    if (isRtl) {
      offset = e.currentTarget.getBoundingClientRect().right - e.clientX;
    } else {
      offset = e.clientX - e.currentTarget.getBoundingClientRect().left;
    }
    const scrollLeft = (offset / outerW) * innerW - outerW / 2;
    if (outerRef.current) {
      outerRef.current.scrollLeft = isRtl ? -scrollLeft : scrollLeft;
    }
  };

  return {
    handleVerticalThumbMouseDown,
    handleHorizontalThumbMouseDown,
    handleVerticalTrackMouseDown,
    handleHorizontalTrackMouseDown,
  };
};
