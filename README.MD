[![Node.js Package](https://github.com/neilning-xc/common-react-scrollbar/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/neilning-xc/common-react-scrollbar/actions/workflows/npm-publish.yml)

# Common React Scrollbar Component

## Description

A common React scrollbar component that supports both vertical and horizontal scrollbars.

## Props

- `children` (React.ReactNode): The content inside the scrollbar.
- `height` (number): The height of the scrollbar container.
- `width` (number): The width of the scrollbar container.
- `dir` ('rtl' | 'ltr'): The direction of the scrollbar. Default is 'ltr'. Compatible with right-to-left languages like Arabic and Hebrew.
- `scrollbarWidth` (number): The width of the scrollbar. Default is 4.
- `scrollbarColor` (string): The color of the scrollbar. Default is '#ced2d9'.
- `scrollbarGutter` (number): The space between the scrollbar and the content. Default is 2.
- `scrollbarRadius` (number): The radius of the scrollbar. Default is 4.
= `scrollbarTrackColor` (string): The color of the scrollbar track. Default is 'transparent'.

## Example

```tsx
import React from 'react';
import { Scrollbar } from './Scrollbar';
import 'common-react-scrollbar/dist/index.css';

const App = () => {
  return (
    <Scrollbar height={300} width={300}>
      <div style={{ height: '600px', width: '600px' }}>
        This is the scrollable content
      </div>
    </Scrollbar>
  );
};

export default App;
```

## Installation

```bash
npm install common-react-scrollbar
```

## Usage

```tsx
import React from 'react';
import { Scrollbar } from 'common-react-scrollbar';
import 'common-react-scrollbar/dist/index.css';

const App = () => {
  return (
    <Scrollbar height={300} width={300}>
      <div style={{ height: '600px', width: '600px' }}>
        This is the scrollable content
      </div>
    </Scrollbar>
  );
};

export default App;
```

## License

MIT
