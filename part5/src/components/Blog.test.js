import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const updateLike = jest.fn()

  beforeEach(() => {
    const removeBlogsMock = jest.fn()
    const handleErrorMock = jest.fn()

    const blog = {
      title: 'Test Title',
      author: 'testing',
      url: 'https://test.com',
      likes: 0,
      user: { username: 'test', name: 'test name', id: 'testUserId' },
      id: 'testBlogId',
    }
    const user = { username: 'test', name: 'test name', token: 'testUserToken' }
    container = render(
      <Blog
        blog={blog}
        user={user}
        handleError={handleErrorMock}
        removeBlogs={removeBlogsMock}
        updateLike={updateLike}
      />
    ).container
  })

  test('renders title and author not url or likes by default', () => {
    const defaultDiv = container.querySelector('[data-test-blog-default]')
    expect(defaultDiv).toHaveTextContent('Test Title', { exact: false })
    expect(defaultDiv).toHaveTextContent('testing', { exact: false })

    const extraDiv = container.querySelector('[data-test-blog-extra]')
    expect(extraDiv).toHaveStyle('display: none')
  })

  test('renders url and likes after clicking the button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const extraDiv = container.querySelector('[data-test-blog-extra]')
    expect(extraDiv).not.toHaveStyle('display: none')
  })

  test('clicking the button twice calls event handler twice', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(updateLike.mock.calls).toHaveLength(2)
  })
})
