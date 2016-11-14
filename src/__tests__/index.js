import test from 'tape'
import {
  every,
  some,
  notEvery,
  notSome,
  when,
} from '../index'

test('every conditions', assert => {
  const facts = {
    user: {
      likes: ['skate', 'travel', 'beach'],
      location: 'Floripa, Brasil'
    },
  }

  const likes = something => ({ user }) => user.likes.some(like => like === something)
  const locatesIn = location => ({ user }) => user.location.includes(location)

  const condition = every([likes('beach'), likes('travel'), locatesIn('Floripa')])
  const invertedCondition = notEvery([likes('beach'), likes('travel'), locatesIn('Uruguay')])

  assert.ok(condition(facts), 'All conditions are true')
  assert.ok(invertedCondition(facts), 'Not all conditions are true')
  assert.end()
})

test('some conditions', assert => {
  const facts = {
    user: {
      likes: ['skate', 'travel', 'beach'],
      location: 'Florianópolis, Brasil'
    },
  }

  const likes = something => ({ user }) => user.likes.some(like => like === something)
  const locatesIn = location => ({ user }) => user.location.includes(location)

  const condition = some([likes('beach'), likes('travel'), locatesIn('São Paulo')])
  const invertedCondition = notSome([likes('surf'), likes('golf'), locatesIn('São Paulo')])

  assert.ok(condition(facts), 'Some of the conditions are true')
  assert.ok(invertedCondition(facts), 'Not some (all) of the conditions are true')
  assert.end()
})

test('should be possible to combine every and some operators', assert => {
  const facts = {
    user: {
      likes: ['skate', 'travel', 'beach'],
      location: 'Montevideo, Uruguay'
    },
  }

  const likes = something => ({ user: { likes } }) => likes.some(like => like === something)
  const locatesIn = location => ({ user }) => user.location.includes(location)

  const truthyCondition = every([
    likes('beach'),
    likes('travel'),
    some([locatesIn('Brasil'), locatesIn('Uruguay')])
  ])
  assert.ok(truthyCondition(facts), 'Result of combined conditions is true')

  const falsyCondition = every([
    likes('Beach'),
    likes('Travel'),
    every([locatesIn('Brasil'), locatesIn('Uruguay')])
  ])
  assert.notOk(falsyCondition(facts), 'Result of combined conditions is false')

  assert.end()
})

test('Using the when function to execute a reaction', assert => {
  assert.plan(2)
  const facts = {
    user: {
      likes: ['skate', 'travel', 'beach'],
      location: 'Montevideo, Uruguay'
    },
  }

  const likes = something => ({ user: { likes } }) => likes.some(like => like === something)
  const locatesIn = location => ({ user }) => user.location.includes(location)

  const truthyCondition = every([
    likes('beach'),
    likes('travel'),
    some([locatesIn('Brasil'), locatesIn('Uruguay')])
  ])

  const falsyCondition = every([
    truthyCondition,
    likes('golf')
  ])

  when(truthyCondition(facts))
    .do(() => assert.pass('Result is true'))
    .else(() => assert.pass('Should pass here'))

  when(falsyCondition(facts))
    .else(() => assert.pass('Result is false'))
    .do(() => assert.pass('Should pass here'))

  assert.end()
})
