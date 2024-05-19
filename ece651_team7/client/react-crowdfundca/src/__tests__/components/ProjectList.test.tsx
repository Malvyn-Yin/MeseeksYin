global.ClipboardEvent = class {};
global.DragEvent = class {};
import * as React from 'react';
import ProjectList from '../../components/ProjectList';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing navigation
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
      state: { categoryId: { categoryId: 1, token: 'mockToken' }},
    }),
  }));
describe('ProjectList page', () => {
    test("project edit page renders without crashing", () => {
      const { getByTestId, getAllByTestId } = render(
        <MemoryRouter>
          <ProjectList />
        </MemoryRouter> 
      );
      expect(getByTestId('app-app-bar')).toBeInTheDocument();
      expect(getByTestId('project-features')).toBeInTheDocument();
      expect(getByTestId('app-footer')).toBeInTheDocument();
    });
  });