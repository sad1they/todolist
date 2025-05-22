import { getNotCompletedLen, setId } from './'
import type { Todo } from '@/types'

describe('Utils', () => {
  describe('getNotCompletedLen', () => {
    test('Return 0 for empty array', () => {
      expect(getNotCompletedLen([])).toBe(0)
    })

    test('Return correct count not completed todos', () => {
      const todos: Todo[] = [
        { id: '1', text: 'Todo 1', completed: true },
        { id: '2', text: 'Todo 2', completed: false },
        { id: '3', text: 'Todo 3', completed: false },
      ]
      expect(getNotCompletedLen(todos)).toBe(2)
    })

    test('Return 0, when all todos completed', () => {
      const todos: Todo[] = [
        { id: '1', text: 'Todo 1', completed: true },
        { id: '2', text: 'Todo 2', completed: true },
      ]
      expect(getNotCompletedLen(todos)).toBe(0)
    })
  })

  describe('setId', () => {
    test('Generate correct id', () => {
      expect(setId(0)).toBe('1')
      expect(setId(2)).toBe('3')
    })
  })
})