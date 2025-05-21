import { useState } from 'react'
import { List, Checkbox, type CheckboxChangeEvent } from 'antd'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { TODO_CONDITION_VALUES, type Todo, type TodoCondition } from '@/types'
import { getNotCompletedLen, setId } from '@/utils'

import './App.css'

const App: React.FC = () => {
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [todoCondition, setTodoCondition] = useState<TodoCondition>(
        TODO_CONDITION_VALUES.ALL,
    )

    const filteredTodoList = todoList.filter((item) => {
        switch (todoCondition) {
            case TODO_CONDITION_VALUES.ALL:
                return true
            case TODO_CONDITION_VALUES.ACTIVE:
                return !item.completed
            case TODO_CONDITION_VALUES.COMPLETED:
                return item.completed
            default:
                return true
        }
    })

    const addTodo = (todoText: string) => {
        setTodoList((prev) => [
            ...prev,
            {
                id: setId(todoList.length, todoList[todoList.length - 1]?.id),
                text: todoText,
                completed: false,
            },
        ])
    }

    const setClearCompleted = () => {
        setTodoList((prev) => prev.filter((item) => !item.completed))
    }

    const handleTodoConditionChange = (val: TodoCondition) => {
        setTodoCondition(val)
    }

    const onChangeCheckbox = (id: string) => (e: CheckboxChangeEvent) => {
        setTodoList((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, completed: e.target.checked }
                    : item,
            ),
        )
    }

    return (
        <div className='main'>
            <h1>Todos</h1>
            <List
                header={<Header addTodo={addTodo} />}
                footer={
                    <Footer
                        count={getNotCompletedLen(todoList)}
                        todoCondition={todoCondition}
                        onTodoConditionChange={handleTodoConditionChange}
                        setClearCompleted={setClearCompleted}
                    />
                }
                bordered
                dataSource={filteredTodoList}
                renderItem={(item) => (
                    <List.Item className='todo-item' key={item.id}>
                        <Checkbox
                            className='todo-item-checkbox'
                            checked={item.completed}
                            onChange={onChangeCheckbox(item.id)}
                        />{' '}
                        <span
                            className={item.completed ? 'item-completed' : ''}
                        >
                            {item.text}
                        </span>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default App
