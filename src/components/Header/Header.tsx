import { useState, type KeyboardEvent } from 'react'
import { Input } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import './Header.css'

interface HeaderProps {
    addTodo: (todoText: string) => void
}

const Header: React.FC<HeaderProps> = ({ addTodo }) => {
    const [todoText, setTodoText] = useState<string>('')

    const enterTodoText = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTodo(todoText)
            setTodoText('')
        }
    }

    return (
        <div className='header'>
            <Input
                placeholder='What needs to be done?'
                prefix={<DownOutlined className='down-icon' />}
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                onKeyDown={(e) => todoText && enterTodoText(e)}
            />
        </div>
    )
}

export default Header
