import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()

// nav のページ遷移テスト
describe('Navigation by Link', () => {
  // next-page-testerを使用する場合は、関数をasyncにする必要がある
  it('Should route to selected page in navbar', async () => {
    const { page } = await getPage({
      route: '/index',
    })
    render(page)

    // blog pageに遷移しているか
    userEvent.click(screen.getByTestId('blog-nav'))
    expect(await screen.findByText('blog page')).toBeInTheDocument()
    // screen.debug() ⇦ blog pageのdomが表示される

    // comment pageに遷移しているか
    userEvent.click(screen.getByTestId('comment-nav'))
    expect(await screen.findByText('comment page')).toBeInTheDocument()

    // context pageに遷移しているか
    userEvent.click(screen.getByTestId('context-nav'))
    expect(await screen.findByText('context page')).toBeInTheDocument()

    // todos pageに遷移しているか
    userEvent.click(screen.getByTestId('task-nav'))
    expect(await screen.findByText('todos page')).toBeInTheDocument()

    // homeに遷移しているか
    userEvent.click(screen.getByTestId('home-nav'))
    expect(await screen.findByText('Welcome to Nextjs')).toBeInTheDocument()
  })
})
