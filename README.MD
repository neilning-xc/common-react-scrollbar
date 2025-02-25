[![Node.js Package](https://github.com/neilning-xc/common-react-scrollbar/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/neilning-xc/common-react-scrollbar/actions/workflows/npm-publish.yml)

# Common React Scrollbar Component

## Description

A common React scrollbar component that supports both vertical and horizontal scrollbars.

## Props

- `children` (React.ReactNode): The content inside the scrollbar.
- `height` (number): The height of the scrollbar container.
- `width` (number): The width of the scrollbar container.

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
