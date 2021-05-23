import { get } from './block.tmpl'

describe('get', () => {
  const obj = {
    user: {
      isAdmin: false,
      isPoet: true,
      info: {
        firstName: 'Alexander',
        lastName: 'Pushkin'
      }
    }
  };

  test('second level works', () => {
    expect(get(obj, 'user.isPoet')).toBe(true)
  })

  test('third level works', () => {
    expect(get(obj, 'user.info.firstName')).toBe('Alexander')
  })

  test('third level returns undefined if no key', () => {
    expect(get(obj, 'user.info.contacts')).toBe(undefined)
  })

  test('forth level returns undefined if no key', () => {
    expect(get(obj, 'user.info.contacts.email')).toBe(undefined)
  })

  test('returns default value if set', () => {
    expect(get(obj, 'user.info.contacts.email', 'a.pushkin@ya.ru')).toBe('a.pushkin@ya.ru')

  })

  test('cannot mutate if already set', () => {
    expect(get(obj, 'user.isAdmin', true)).toBe(false)
  })
})
