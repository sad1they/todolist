import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
    test('Render input', () => {
        const addTodo = jest.fn()
        render(<Header addTodo={addTodo} />)
        expect(
            screen.getByPlaceholderText('What needs to be done?'),
        ).toBeInTheDocument()
    })

    test('Clear input after pressing Enter button', () => {
        const addTodo = jest.fn()
        render(<Header addTodo={addTodo} />)
        const input = screen.getByPlaceholderText('What needs to be done?')

        fireEvent.change(input, { target: { value: 'New Todo' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(addTodo).toHaveBeenCalledWith('New Todo')
        expect(input).toHaveValue('')
    })

    test('dont call addTodo onClick Enter with empty data', () => {
        const addTodo = jest.fn()
        render(<Header addTodo={addTodo} />)
        const input = screen.getByPlaceholderText('What needs to be done?')

        fireEvent.change(input, { target: { value: '' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(addTodo).not.toHaveBeenCalled()
    })
})
