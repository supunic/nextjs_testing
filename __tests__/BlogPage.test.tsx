import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

initTestHelpers()

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts/', (req, res, ctx) => {
    const query = req.url.searchParams
    const _limit = query.get('_limit')
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: 'dummy title 1',
            body: 'dummy body 1',
          },
          {
            userId: 2,
            id: 2,
            title: 'dummy title 2',
            body: 'dummy body 2',
          },
        ])
      )
    }
  }),
]

// mock api 用のサーバを立てる
const server = setupServer(...handlers)

// 最初にmockサーバを起動
beforeAll(() => {
  server.listen()
})

// テストごとにリセットしてテスト間副作用をなくす
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

// 最後にサーバを閉じる
afterAll(() => {
  server.close()
})

describe(`Blog page`, () => {
  it('Should render the list of blogs pre-fetched by getStaticProps', async () => {
    // blog page を取得
    const { page } = await getPage({
      route: '/blog-page',
    })

    render(page) // domを取得
    expect(await screen.findByText('blog page')).toBeInTheDocument() // dom取得の確認
    expect(screen.getByText('dummy title 1')).toBeInTheDocument() // titleがdomにあるかtest
    expect(screen.getByText('dummy title 2')).toBeInTheDocument()
  })
})
