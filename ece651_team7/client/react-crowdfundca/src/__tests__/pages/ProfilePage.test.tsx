import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ProfilePage from '../../components/ProfilePage';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../components/views/AppAppBar', () => () => <div>Mocked AppAppBar</div>);

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const urlString = typeof url === 'string' ? url : url.toString();
    
    // 处理 getUserProfile 请求
    if (urlString.includes('/api/profile/getUserProfile')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ firstName: "Peng", lastName: "Yin" /* 其他用户信息 */ }),
      });
    }
    // 处理 showUserDonateProject 和 showUserProject 请求
    else if (urlString.includes('/api/project/showUserDonateProject') || urlString.includes('/api/project/showUserProject')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ /* 项目相关信息 */ }),
      });
    }
    // 为 getCategorys 请求提供一个简单的模拟响应，避免抛出错误
    else if (urlString.includes('/api/project/getCategorys')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ /* 模拟的分类相关信息，根据需要填写 */ }),
      });
    }
    // 其他未处理的请求可以返回一个简单的拒绝，或者根据需要自定义
    return Promise.reject(new Error('未处理的请求: ' + urlString));
  }) as jest.Mock;
});

afterEach(() => {
  // 清理 mock
  (global.fetch as jest.Mock).mockClear();
});

test('ProfilePage renders correctly', () => {
  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );
  expect(screen.getByText(/Please Signin First/i)).toBeInTheDocument();
  expect(screen.getByText(/Participated/i)).toBeInTheDocument();
});

test('Tab changes correctly on click', () => {
  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );
  const tab = screen.getAllByRole('tab')[1]; // "Initiated" 标签
  fireEvent.click(tab);
  expect(tab).toHaveAttribute('aria-selected', 'true');
});

test('User info renders correctly', async () => {
  render(
    <MemoryRouter>
      <ProfilePage />
    </MemoryRouter>
  );

  // 使用正则表达式来匹配包含 "Peng Yin" 文本的元素
  const fullNameRegex = /Peng Yin/i;
  const fullName = await screen.findByText(fullNameRegex);
  expect(fullName).toBeInTheDocument();
});
