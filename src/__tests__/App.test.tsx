import React from 'react';
import { render } from '@testing-library/react-native';

import App from '../../App';

describe('App', () => {
  it('matches previous snapshot', () => {
    const tree = render(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('renders the app corectly', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
