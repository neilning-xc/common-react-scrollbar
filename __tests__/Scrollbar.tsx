import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Scrollbar from '../src';

const renderScrollbar = (width: number | undefined, height: number | undefined, clientWidth: number, clientHeight: number, dir?: 'rtl' | 'ltr') => {
  const mockInnerDiv = document.createElement('div');
  jest.spyOn(mockInnerDiv, 'clientHeight', 'get').mockReturnValue(clientHeight);
  jest.spyOn(mockInnerDiv, 'clientWidth', 'get').mockReturnValue(clientWidth);
  const innerRef = { current: mockInnerDiv };

  const mockOuterDiv = document.createElement('div');
  jest.spyOn(mockOuterDiv, 'clientHeight', 'get').mockReturnValue(200);
  jest.spyOn(mockOuterDiv, 'clientWidth', 'get').mockReturnValue(200);
  const outerRef = { current: mockOuterDiv };

  return render(
    <Scrollbar dir={dir} width={width} height={height} outerRef={outerRef} innerRef={innerRef}>
      <div style={{ width: clientHeight, height: clientHeight }} ></div>
    </Scrollbar>
  );
};

describe('Scrollbar', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows both horizontal and vertical scrollbars', () => {
    const {container} = renderScrollbar(200, 200, 500, 1000);
    const vScrollbar = container.querySelector('.scrollbar-vertical-track');
    const hScrollbar = container.querySelector('.scrollbar-horizontal-track');
    const vThumb = container.querySelector('.vertical-thumb');
    const hThumb = container.querySelector('.horizontal-thumb');

    expect(vScrollbar).toBeInTheDocument();
    expect(hScrollbar).toBeInTheDocument();
    expect(vThumb).toHaveStyle('height: 20%');
    expect(hThumb).toHaveStyle('width: 40%');
  });
  
  it('show vertical scrollbar only', () => {
    const {container} = renderScrollbar(200, 200, 200, 800);
    const vScrollbar = container.querySelector('.scrollbar-vertical-track');
    const hScrollbar = container.querySelector('.scrollbar-horizontal-track');
    const vThumb = container.querySelector('.vertical-thumb');
    const hThumb = container.querySelector('.horizontal-thumb');
    expect(hScrollbar).toBe(null);
    expect(vScrollbar).toBeInTheDocument();
    expect(hThumb).toBe(null);
    expect(vThumb).toBeInTheDocument();
  });

  it('show horizontal scrollbar only', () => {
    const {container} = renderScrollbar(200, 200, 800, 200);
    const vScrollbar = container.querySelector('.scrollbar-vertical-track');
    const hScrollbar = container.querySelector('.scrollbar-horizontal-track');
    const vThumb = container.querySelector('.vertical-thumb');
    const hThumb = container.querySelector('.horizontal-thumb');
    expect(vScrollbar).toBe(null);
    expect(hScrollbar).toBeInTheDocument();
    expect(vThumb).toBe(null);
    expect(hThumb).toBeInTheDocument();
  });

  it('does not show any scrollbar', () => {
    const {container} = renderScrollbar(200, 200, 200, 200);
    const vScrollbar = container.querySelector('.scrollbar-vertical-track');
    const hScrollbar = container.querySelector('.scrollbar-horizontal-track');
    const vThumb = container.querySelector('.vertical-thumb');
    const hThumb = container.querySelector('.horizontal-thumb');
    expect(vScrollbar).toBe(null);
    expect(hScrollbar).toBe(null);
    expect(vThumb).toBe(null);
    expect(hThumb).not.toBeInTheDocument();
  });

  it('does not show any scrollbar', () => {
    const {container} = renderScrollbar(undefined, undefined, 300, 300);
    const vScrollbar = container.querySelector('.scrollbar-vertical-track');
    const hScrollbar = container.querySelector('.scrollbar-horizontal-track');
    const vThumb = container.querySelector('.vertical-thumb');
    const hThumb = container.querySelector('.horizontal-thumb');
    expect(vScrollbar).toBe(null);
    expect(hScrollbar).toBe(null);
    expect(vThumb).toBe(null);
    expect(hThumb).not.toBeInTheDocument();
  });
});

describe('Scrollbar rtl | ltr', () => {
  it('scrollbar without dir', () => {
    const { container, debug } = render(
      <Scrollbar width={200} height={200}>
        <div style={{ width: 500, height: 1000 }} ></div>
      </Scrollbar>
    );

    const scrollCon = container.querySelector('.scrollbar-container');
    expect(scrollCon?.getAttribute('dir')).toBe(null);
  });
  
  it('scrollbar with dir=ltr', () => {
    const { container } = render(
      <Scrollbar width={200} height={200} dir='ltr'>
        <div style={{ width: 500, height: 1000 }} ></div>
      </Scrollbar>
    );

    const scrollCon = container.querySelector('.scrollbar-container');
    expect(scrollCon?.getAttribute('dir')).toBe('ltr');
  });

  it('scrollbar with dir=rtl', () => {
    const { container } = render(
      <Scrollbar width={200} height={200} dir='rtl'>
        <div style={{ width: 500, height: 1000 }} ></div>
      </Scrollbar>
    );

    const scrollCon = container.querySelector('.scrollbar-container');
    expect(scrollCon?.getAttribute('dir')).toBe('rtl');
  });
});