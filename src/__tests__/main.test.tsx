import { render } from '@testing-library/react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import main from '../main';

it('renders correctly', () => {
  const tree = render(<main/>);
  expect(tree).toMatchSnapshot();
});

it('should show map', () => {
  const { getByTestId } = render(<main/>)

  const map = getByTestId('mapView');
  expect(map).toBeTruthy();
})

// Given that a trip has information, when there is a location update, then the trip information section should display the status, eta, etc.

// Given that a trip is being tracked, when there is an error, then display the error text.

// When you put in a trip ID, then the map should update the <some component of the sample app> should update
// Don’t have to test “map should update” -- we can assume that the JSJS SDK would update the map and anything inside the app

// Given that an invalid ID is entered, then the sample app should show an error to the user
