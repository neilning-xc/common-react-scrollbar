import { useRef, useState } from 'react';

interface ScrollHandlers {
  outerRect: React.RefObject<{ height: number; width: number }>;
}

export const useScrollHandlers = (data: ScrollHandlers) => {
  const { outerRect } = data;

  const [translateY, setTranslateY] = useState<number | string>(0);
  const [translateX, setTranslateX] = useState<number | string>(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { height, width } = outerRect.current;
    const y = (e.currentTarget.scrollTop / height) * 100 + '%';
    setTranslateY(y);

    const x = (e.currentTarget.scrollLeft / (width as number)) * 100 + '%';
    setTranslateX(x);
  };

  return {
    translateY,
    translateX,
    handleScroll,
  };
};
