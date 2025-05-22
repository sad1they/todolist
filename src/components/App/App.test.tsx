import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { TODO_CONDITION_VALUES, TodoCondition } from '@/types'

jest.mock('../Header/Header', () => {
    return ({ addTodo }: { addTodo: (text: string) => void }) => (
        <input
            data-testid='task-input'
            onKeyDown={(e) =>
                e.key === 'Enter' && addTodo(e.currentTarget.value)
            }
            defaultValue=''
        />
    )
})

jest.mock('../Footer/Footer', () => {
    return ({
        count,
        todoCondition,
        onTodoConditionChange,
        setClearCompleted,
    }: {
        count: number
        todoCondition: TodoCondition
        onTodoConditionChange: (val: string) => void
        setClearCompleted: () => void
    }) => (
        <div>
            <div data-testid='count'>{count} items left</div>
            <div data-testid='radio-group' data-value={todoCondition}>
                <button
                    data-testid='radio-all'
                    onClick={() =>
                        onTodoConditionChange(TODO_CONDITION_VALUES.ALL)
                    }
                >
                    All
                </button>
                <button
                    data-testid='radio-active'
                    onClick={() =>
                        onTodoConditionChange(TODO_CONDITION_VALUES.ACTIVE)
                    }
                >
                    Active
                </button>
                <button
                    data-testid='radio-completed'
                    onClick={() =>
                        onTodoConditionChange(TODO_CONDITION_VALUES.COMPLETED)
                    }
                >
                    Completed
                </button>
            </div>
            <button data-testid='clear-completed' onClick={setClearCompleted}>
                Clear completed
            </button>
        </div>
    )
})

describe('App', () => {
    test('Correct render interface', () => {
        render(<App />)
        expect(screen.getByText('Todos')).toBeInTheDocument()
        expect(screen.getByTestId('count')).toHaveTextContent('0 items left')
        expect(screen.getByTestId('task-input')).toBeInTheDocument()
        expect(screen.getByTestId('radio-group')).toBeInTheDocument()
    })

    test('Add new Todo on click Enter', () => {
        render(<App />)
        const input = screen.getByTestId('task-input')
        fireEvent.change(input, { target: { value: 'New Todo' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(screen.getByText('New Todo')).toBeInTheDocument()
        expect(screen.getByTestId('count')).toHaveTextContent('1 items left')
    })

    test('Add classname on checkbox and remove Todo from count', () => {
        render(<App />)
        const input = screen.getByTestId('task-input')
        fireEvent.change(input, { target: { value: 'Todo 1' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        expect(screen.getByText('Todo 1')).toBeInTheDocument()

        const checkbox = screen.getByRole('checkbox')
        fireEvent.click(checkbox)

        expect(screen.getByText('Todo 1')).toHaveClass('item-completed')
        expect(screen.getByTestId('count')).toHaveTextContent('0 items left')
    })

    test('Filter Todos by active/completed', () => {
        render(<App />)
        const input = screen.getByTestId('task-input')
        fireEvent.change(input, { target: { value: 'Todo 1' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        fireEvent.change(input, { target: { value: 'Todo 2' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        const checkboxes = screen.getAllByRole('checkbox')
        fireEvent.click(checkboxes[0])

        const activeButton = screen.getByTestId('radio-active')
        fireEvent.click(activeButton)

        expect(screen.queryByText('Todo 1')).not.toBeInTheDocument()
        expect(screen.getByText('Todo 2')).toBeInTheDocument()
        expect(screen.getByTestId('count')).toHaveTextContent('1 items left')
    })

    test('фильтрует задачи по статусу Completed', () => {
        render(<App />)
        const input = screen.getByTestId('task-input')
        fireEvent.change(input, { target: { value: 'Todo 1' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        fireEvent.change(input, { target: { value: 'Todo 2' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        const checkboxes = screen.getAllByRole('checkbox')
        fireEvent.click(checkboxes[0])

        const completedButton = screen.getByTestId('radio-completed')
        fireEvent.click(completedButton)

        expect(screen.getByText('Todo 1')).toBeInTheDocument()
        expect(screen.queryByText('Todo 2')).not.toBeInTheDocument()
        expect(screen.getByTestId('count')).toHaveTextContent('1 items left')
    })

    test('Remove completed todo', () => {
        render(<App />)
        const input = screen.getByTestId('task-input')
        fireEvent.change(input, { target: { value: 'Todo 1' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        fireEvent.change(input, { target: { value: 'Todo 2' } })
        fireEvent.keyDown(input, { key: 'Enter' })

        const checkboxes = screen.getAllByRole('checkbox')
        fireEvent.click(checkboxes[0])

        const clearButton = screen.getByTestId('clear-completed')
        fireEvent.click(clearButton)

        expect(screen.queryByText('Todo 1')).not.toBeInTheDocument()
        expect(screen.getByText('Todo 2')).toBeInTheDocument()
        expect(screen.getByTestId('count')).toHaveTextContent('1 items left')
    })
})
