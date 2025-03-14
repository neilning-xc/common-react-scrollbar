interface ScrollbarStyles {
  scrollbarWidth?: number;
  scrollbarColor?: string;
  scrollbarGutter?: number;
  scrollbarTrackColor?: string;
  scrollbarRadius?: number | string;
}

export const useScrollbarStyles = (styles: ScrollbarStyles) => {
  const {
    scrollbarWidth = 4,
    scrollbarColor = '#ced2d9',
    scrollbarGutter = 2,
    scrollbarRadius = 4,
    scrollbarTrackColor = 'transparent',
  } = styles;


  return {
    scrollbarRadius,
    scrollbarTrackColor,
    scrollbarColor,
    trackWidth: scrollbarWidth + scrollbarGutter * 2,
    thumbWidth: scrollbarWidth,
    trackPadding: scrollbarGutter,
  };
};