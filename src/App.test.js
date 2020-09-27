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
  expect(getByText('Jeg hedder June Skaaning og er fra 1961. Jeg er bosiddende nord for Randers i en lille landsby. I 2006 begyndte jeg mit nye liv, hvor jeg selv ville bestemme over min arbejdstid og det jeg havde lyst til. Det blev og er en dejlig rejse, med mange uddannelser og kurser indenfor bevægelse, se nærmere under uddannelser og kurser.')).toBeInTheDocument();
});
