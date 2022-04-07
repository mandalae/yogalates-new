import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render, act } from '@testing-library/react';
import PageService from '../../services/PageService';
import About from './About';

describe('About', () => {
    let getPageResolve;

    beforeEach(() => {
        PageService.getPage = jest.fn();
        PageService.getPage.mockReturnValue(new Promise(resolve => {
            getPageResolve = resolve;
        }));
    });

    it('renders the page', async () => {
      const { getByText } = render(<About />);

      await act(async () => {
         await getPageResolve({
             headline: 'Om mig',
             content: 'Jeg hedder June og sådan'
         });
      });

      expect(getByText('Lidt om mig')).toBeInTheDocument();
      expect(getByText('June Skaaning - Yoga instruktør.')).toBeInTheDocument();
    });
});
