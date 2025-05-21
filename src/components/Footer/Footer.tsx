import { Button, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { TODO_CONDITION_VALUES, type TodoCondition } from '@/types'

import './Footer.css'

interface FooterProps {
    count?: number
    todoCondition: TodoCondition
    onTodoConditionChange: (val: TodoCondition) => void
    setClearCompleted: () => void
}

const Footer: React.FC<FooterProps> = ({
    count = 0,
    todoCondition,
    onTodoConditionChange,
    setClearCompleted,
}) => {
    const changeTodoCondition = (e: RadioChangeEvent) => {
        onTodoConditionChange(e.target.value)
    }

    return (
        <div className='footer'>
            <div>{count} items left</div>
            <Radio.Group value={todoCondition} onChange={changeTodoCondition}>
                <Radio.Button value={TODO_CONDITION_VALUES.ALL}>
                    All
                </Radio.Button>
                <Radio.Button value={TODO_CONDITION_VALUES.ACTIVE}>
                    Active
                </Radio.Button>
                <Radio.Button value={TODO_CONDITION_VALUES.COMPLETED}>
                    Completed
                </Radio.Button>
            </Radio.Group>
            <Button
                className='clear-btn'
                color='default'
                variant='text'
                onClick={setClearCompleted}
            >
                Clear completed
            </Button>
        </div>
    )
}

export default Footer
