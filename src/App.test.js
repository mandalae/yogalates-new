import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path"
  })
}));

test('renders the page', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(getByText('Jeg hedder June Skaaning, er fra 1961 og bosiddende nord for Randers i en lille landsby.')).toBeInTheDocument();
});
