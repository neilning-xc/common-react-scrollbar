import React, { useEffect, useState, useRef } from 'react';

import './scrollbar.css';

interface ScrollbarProps {
  children?: React.ReactNode;
  height?: number;
  width?: number;
  outerRef?: React.RefObject<HTMLDivElement | null>;
  innerRef?: React.RefObject<HTMLDivElement | null>;
  dir?: 'ltr' | 'rtl';
}

const getScrollBarWidth: () => number = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }

  return widthNoScroll - widthWithScroll;
};

export const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  width,
  height,
  outerRef: outerRefProps,
  innerRef: innerRefProps,
  dir,
}) => {
  const outerRef = useRef<HTMLDivElement>(
    outerRefProps ? outerRefProps.current : null,
  );
  const innerRef = useRef<HTMLDivElement>(
    innerRefProps ? innerRefProps.current : null,
  );
  const outerRect = useRef<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });
  const innerRect = useRef<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  const scaleY = useRef<number>(0);
  const [translateY, setTranslateY] = useState<number | string>(0);

  const [scrollHeight, setScrollHeight] = useState<number | string>(0);

  const verticalMouseDown = useRef<boolean>(false);
  const startY = useRef<number>(0);
  const startScrollTop = useRef<number>(0);

  const [shouldShowVerticval, setShouldShowVerticval] =
    useState<boolean>(false);
  const [marginX, setMarginX] = useState<number>(0);
  const scrollBarWidth = useRef<number>(0);

  const scaleX = useRef<number>(0);
  const [translateX, setTranslateX] = useState<number | string>(0);
  const [scrollWidth, setScrollWidth] = useState<number | string>(0);
  const horizontalMouseDown = useRef(false);
  const startX = useRef<number>(0);
  const startScrollLeft = useRef<number>(0);
  const [shouldShowHorizontal, setShouldShowHorizontal] = useState(false);
  const isRtl = dir === 'rtl';

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { height } = outerRect.current;
    const y = (e.currentTarget.scrollTop / height) * 100 + '%';
    setTranslateY(y);

    const x = (e.currentTarget.scrollLeft / (width as number)) * 100 + '%';
    setTranslateX(x);
  };

  // click event on the track
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

  // take the thumb and move it
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

  const handleMouseUp = (e: MouseEvent) => {
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
  }, [outerRef.current, innerRef.current]);

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
  }, [innerRef.current, height]);

  useEffect(() => {
    scrollBarWidth.current = getScrollBarWidth();
    setMarginX(scrollBarWidth.current);
  }, []);

  return (
    <div className="scrollbar-container" dir={dir} style={{ height, width }}>
      {shouldShowVerticval && (
        <div
          className="scrollbar-vertical-track"
          onMouseDown={handleVerticalTrackMouseDown}
        >
          <div
            className="vertical-thumb"
            onMouseDown={handleVerticalThumbMouseDown}
            style={{
              height: scrollHeight,
              transform: `translateY(${translateY})`,
            }}
          />
        </div>
      )}

      {shouldShowHorizontal && (
        <div
          className="scrollbar-horizontal-track"
          onMouseDown={handleHorizontalTrackMouseDown}
        >
          <div
            className="horizontal-thumb"
            onMouseDown={handleHorizontalThumbMouseDown}
            style={{
              width: scrollWidth,
              transform: `translateX(${translateX})`,
            }}
          />
        </div>
      )}

      <div
        ref={outerRefProps || outerRef}
        className="scrollbar-outer"
        onScroll={handleScroll}
        style={{
          [isRtl ? 'marginLeft' : 'marginRight']: shouldShowVerticval
            ? `-${marginX}px`
            : 0,
          height: shouldShowHorizontal
            ? `${(height as number) + marginX}px`
            : height,
        }}
      >
        <div className="scrollbar-inner" ref={innerRefProps || innerRef}>
          {children}
        </div>
      </div>
    </div>
  );
};
