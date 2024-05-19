import * as React from 'react';
import ProjectDetail from '../../components/ProjectDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing navigation

describe('ProjectDetail page', () => {
  test("project detail page renders without crashing", () => {
    const projectItem = {
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
    };
    const { getByTestId, getAllByTestId } = render(
      <MemoryRouter initialEntries={[{ state: { data:{projectItem} } }]}>
        <ProjectDetail />
      </MemoryRouter>
    );
    expect(getByTestId('app-app-bar')).toBeInTheDocument();
    expect(getByTestId('project-info')).toBeInTheDocument();
    expect(getByTestId('project-description')).toBeInTheDocument();
    expect(getByTestId('app-footer')).toBeInTheDocument();
  });
});