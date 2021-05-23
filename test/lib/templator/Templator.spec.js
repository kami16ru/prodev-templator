import Templator from "../../../src/lib/templator/Templator"

describe('Class Templator', () => {
  test('new works', () => {
    expect(new Templator()).toBeInstanceOf(Templator)
  })

  test('_template is set', () => {
    const template = '<div>Hello<div>'
    const tmpl = new Templator(template)

    expect(tmpl._template).toBe(template)
  })
})

describe('compile', () => {
  test('works', () => {
    let testTempl = `
      <div>
          {{ field1 }}
          <span>{{field2}}</span>
          <span>{{ field3.info.name }}</span>
      </div>
    `
    const ctx = {
      field1: 'Text 1',
      field2: 42,
      field3: {
        info: {
          name: 'Simon',
        }
      }
    }
    const tmpl = new Templator(testTempl)

    expect(tmpl.compile(ctx)).toMatchSnapshot()
  })
})

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
  const tmpl = new Templator()
  const get = tmpl._getData

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
