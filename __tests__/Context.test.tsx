import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StateProvider } from '../context/StateProvider'
import ContextA from '../components/ContextA'
import ContextB from '../components/ContextB'

describe('Global state management (useContext)', () => {
  it('Should change the toggle state globally', () => {
    // contextの対象範囲のレンダリング
    render(
      <StateProvider>
        <ContextA />
        <ContextB />
      </StateProvider>
    )
    // 初期値のfalseが表示されているか
    expect(screen.getByTestId('toggle-a').textContent).toBe('false')
    expect(screen.getByTestId('toggle-b').textContent).toBe('false')
    // ボタンクリック
    userEvent.click(screen.getByRole('button'))
    // contextがtrueに変わっているかどうか
    expect(screen.getByTestId('toggle-a').textContent).toBe('true')
    expect(screen.getByTestId('toggle-b').textContent).toBe('true')
  })
})
