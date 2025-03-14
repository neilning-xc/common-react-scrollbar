import React, { useEffect, useState, useRef } from 'react';

import { useScrollbarStatus, useScrollbarSize, useMouseEventHandlers, useScrollHandlers, useScrollbarStyles } from '../hooks';

import '../scrollbar.css';

interface CustomStyle {
  scrollbarWidth?: number;
  scrollbarColor?: string;
  scrollbarGutter?: number;
  scrollbarTrackColor?: string;
  scrollbarRadius?: number | string;
}

interface ScrollbarProps extends CustomStyle {
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

export const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const {
    children,
    width,
    height,
    outerRef: outerRefProps,
    innerRef: innerRefProps,
    dir,
    ...styles
  } = props;

  const isRtl = dir === 'rtl';

  const {
    scrollbarRadius,
    scrollbarTrackColor,
    scrollbarColor,
    trackWidth,
    thumbWidth,
    trackPadding,
  } = useScrollbarStyles(styles);

  const outerRef = useRef<HTMLDivElement>(
    outerRefProps ? outerRefProps.current : null,
  );
  const innerRef = useRef<HTMLDivElement>(
    innerRefProps ? innerRefProps.current : null,
  );

  const { shouldShowHorizontal, shouldShowVerticval } = useScrollbarStatus({
    width,
    height,
    innerRef,
  });

  const {
    scaleY,
    scaleX,
    scrollHeight,
    scrollWidth,
    outerRect,
    innerRect,
  } = useScrollbarSize({
    width,
    height,
    innerRef,
    outerRef,
  });

  const {
    handleVerticalThumbMouseDown,
    handleHorizontalThumbMouseDown,
    handleVerticalTrackMouseDown,
    handleHorizontalTrackMouseDown,
  } = useMouseEventHandlers({
    outerRef,
    scaleY,
    scaleX,
    outerRect,
    innerRect,
    isRtl,
  });

  const { translateY, translateX, handleScroll } = useScrollHandlers({ outerRect });

  const [trackSize, setTrackSize] = useState<number>(0);

  const [marginX, setMarginX] = useState<number>(0);
  const scrollBarWidth = useRef<number>(0);

  useEffect(() => {
    scrollBarWidth.current = getScrollBarWidth();
    setMarginX(scrollBarWidth.current);
  }, []);

  return (
    <div className="scrollbar-container" dir={dir} style={{ height, width }}>
      {shouldShowVerticval && (
        <div
          className="scrollbar-vertical-track"
          style={{
            width: trackWidth,
            padding: `0 ${trackPadding}px`,
            background: scrollbarTrackColor,
          }}
          onMouseDown={handleVerticalTrackMouseDown}
        >
          <div
            className="vertical-thumb"
            onMouseDown={handleVerticalThumbMouseDown}
            style={{
              height: scrollHeight,
              transform: `translateY(${translateY})`,
              background: scrollbarColor,
              width: thumbWidth,
              borderRadius: scrollbarRadius,
            }}
          />
        </div>
      )}

      {shouldShowHorizontal && (
        <div
          style={{
            height: trackWidth,
            padding: `${trackPadding}px 0`,
            background: scrollbarTrackColor,
          }}
          className="scrollbar-horizontal-track"
          onMouseDown={handleHorizontalTrackMouseDown}
        >
          <div
            className="horizontal-thumb"
            onMouseDown={handleHorizontalThumbMouseDown}
            style={{
              width: scrollWidth,
              transform: `translateX(${translateX})`,
              background: scrollbarColor,
              height: thumbWidth,
              borderRadius: scrollbarRadius,
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
