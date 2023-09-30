import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  test('calls the event handler with the right details when a new blog is created', async () => {
    const updateBlogsMock = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm updateBlogs={updateBlogsMock} />)
    const titleInput = container.querySelector('[name="Title"]')
    const authorInput = container.querySelector('[name="Author"]')
    const urlInput = container.querySelector('[name="Url"]')
    const sendButton = screen.getByText('Create')

    await user.type(titleInput, 'test Title')
    await user.type(authorInput, 'test Author')
    await user.type(urlInput, 'http://test.Url')
    await user.click(sendButton)

    expect(updateBlogsMock.mock.calls).toHaveLength(1)
    expect(updateBlogsMock.mock.calls[0][0].title).toBe('test Title')
    expect(updateBlogsMock.mock.calls[0][0].author).toBe('test Author')
    expect(updateBlogsMock.mock.calls[0][0].url).toBe('http://test.Url')
  })
})
