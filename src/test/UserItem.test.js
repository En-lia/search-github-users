import { render, screen } from '@testing-library/react';
import UserItem from '../components/UserItem/UserItem';

jest.mock('antd', () => {
    return {
        ...jest.requireActual('antd'),
        Avatar: jest.fn(() => 'Avatar'),
        Button: jest.fn(() => 'Button'),
        GithubOutlined: jest.fn(() => 'GithubOutlined'),
    };
});

const user = {
    id: 105123,
    avatar_url: 'https://avatars.githubusercontent.com/u/510403',
    login: 'userTest',
    html_url: 'https://github.com/userTest',
};

describe('UserItem: checking the existence of page elements', () => {
    beforeEach(() => {
        render(<UserItem user={user} />);
    });

    test('Check login display', () => {
        const loginElement = screen.getByText(/userTest/i);
        expect(loginElement).toBeInTheDocument();
    });

    test('Check id display', () => {
        const idElement = screen.getByText(/105123/i);
        expect(idElement).toBeInTheDocument();
    });

    test('Check gitHubBtn display', () => {
        const gitHubBtn = screen.getByRole('link');
        expect(gitHubBtn).toHaveAttribute('href', 'https://github.com/userTest');
    });
});