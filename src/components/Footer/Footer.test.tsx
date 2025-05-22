import { render, screen, fireEvent } from '@testing-library/react'
import Footer from './Footer'
import { TODO_CONDITION_VALUES } from '@/types'

describe('Footer', () => {
    test('Render counter and all buttons', () => {
        render(
            <Footer
                count={2}
                todoCondition={TODO_CONDITION_VALUES.ALL}
                onTodoConditionChange={jest.fn()}
                setClearCompleted={jest.fn()}
            />,
        )
        expect(screen.getByText('2 items left')).toBeInTheDocument()
        expect(screen.getByText('All')).toBeInTheDocument()
        expect(screen.getByText('Active')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
        expect(screen.getByText('Clear completed')).toBeInTheDocument()
    })

    test('Call onTodoConditionChange with TODO_CONDITION_VALUES.ACTIVE', () => {
        const onTodoConditionChange = jest.fn()
        render(
            <Footer
                count={0}
                todoCondition={TODO_CONDITION_VALUES.ALL}
                onTodoConditionChange={onTodoConditionChange}
                setClearCompleted={jest.fn()}
            />,
        )

        const activeButton = screen.getByText('Active')
        fireEvent.click(activeButton)

        expect(onTodoConditionChange).toHaveBeenCalledWith(
            TODO_CONDITION_VALUES.ACTIVE,
        )
    })

    test('Call clearCompleted onClick button Clear completed', () => {
        const setClearCompleted = jest.fn()
        render(
            <Footer
                count={0}
                todoCondition={TODO_CONDITION_VALUES.ALL}
                onTodoConditionChange={jest.fn()}
                setClearCompleted={setClearCompleted}
            />,
        )

        const clearButton = screen.getByText('Clear completed')
        fireEvent.click(clearButton)

        expect(setClearCompleted).toHaveBeenCalled()
    })
})
