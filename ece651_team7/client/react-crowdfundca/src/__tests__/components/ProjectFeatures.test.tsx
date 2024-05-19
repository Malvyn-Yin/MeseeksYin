import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectFeatures from '../../components/views/ProjectFeatures';
import * as ApiService from '../../services/apiService';
import { MemoryRouter } from 'react-router-dom';

// Mock the entire ApiService module
jest.mock('../../services/apiService', () => ({
  fetchData: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
      state: { categoryId: { categoryId: 1, token: 'mockToken' }},
    }),
  }));

describe('ProjectFeatures', () => {
  beforeEach(() => {
    // Reset mocks before each test
    ApiService.fetchData.mockClear();
  });

  it('renders without error and fetches data correctly', async () => {
    // Setup the mock implementation of fetchData for different scenarios
    ApiService.fetchData.mockImplementation((url, authToken, callback) => {
      if (url.includes('getCategoryInfoById')) {
        const mockResponseData = {projectInfo: {
        categoryname: 'Test Category',
        categorydescription: 'Description of Test Category',
        },};
        return callback(mockResponseData);
      } else if (url.includes('getUserProfile')) {
        const mockResponseData = {
            user: {
                firstName: 'firstName',
                lastName: 'lastName',
                profilePic: '',
            }
        }
        return callback(mockResponseData);
      } else if (url.includes('showProjectBy')) {
        const mockResponseData = {
            projectInfo: [
                {
                    _id: "id",
                    pid: `pid`,
                    projectname: `Project 1`,
                    projectsdescription: "This is a mock description for the project. It outlines the project goals, scope, and intended impact.",
                    categoryid: `CAT`,
                    images: [],
                    userId: `USER`,
                    token: `token`,
                    targetmoney: "10000",
                    currentmoney: "5000",
                    statue: false,
                    enddate: new Date(),
                    startdate: new Date(),
                    rewardlevel: ["Gold", "Silver", "Bronze"],
                    rewardprice: ["100", "50", "25"],
                    rewardcontent: [
                      "Gold Package: Exclusive content + Meet & Greet",
                      "Silver Package: Exclusive content",
                      "Bronze Package: Early access"
                    ],
                },
                {
                    _id: "id",
                    pid: `pid`,
                    projectname: `Project 2`,
                    projectsdescription: "This is a mock description for the project. It outlines the project goals, scope, and intended impact.",
                    categoryid: `CAT`,
                    images: [],
                    userId: `USER`,
                    token: `token`,
                    targetmoney: "10000",
                    currentmoney: "5000",
                    statue: false,
                    enddate: new Date(),
                    startdate: new Date(),
                    rewardlevel: ["Gold", "Silver", "Bronze"],
                    rewardprice: ["100", "50", "25"],
                    rewardcontent: [
                      "Gold Package: Exclusive content + Meet & Greet",
                      "Silver Package: Exclusive content",
                      "Bronze Package: Early access"
                    ],
                },
              ],
            };
        return callback(mockResponseData);
      }
      return Promise.reject(new Error('Unexpected URL'));
    });

    render(
      <MemoryRouter>
        <ProjectFeatures />
      </MemoryRouter>
    );

    // Verify fetchData was called at least once
    await waitFor(() => expect(ApiService.fetchData).toHaveBeenCalled());

    // Example: Checking for the presence of category title in the document
    await waitFor(() => {
      const categoryTitleElement = screen.getByTestId('category-title');
      expect(categoryTitleElement).toHaveTextContent('Test Category');
    });

    // expect(screen.getByText('Project 1')).toBeInTheDocument();
    const items = screen.getAllByText('Project 1');
    expect(items.length).toBeGreaterThan(1); // Example assertion
    const items2 = screen.getAllByText('Project 2');
    expect(items2.length).toBeGreaterThan(1); // Example assertion
  });

  // Include more tests as needed, focusing on different aspects of the component
});
