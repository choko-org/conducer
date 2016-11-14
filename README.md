# Conducer
Minimal tools for creating rules with conditions using simple reducers.
Conditions are pure functions, so there's no side-effects.
Facts must have everything needed by the conditions.

[![Build Status](https://travis-ci.org/choko-org/conducer.svg?branch=master)](https://travis-ci.org/choko-org/conducer)

## Tools:
They return a single condition `function` which expects the `facts` as argument in order to return a boolean.

#### `every([ condition, conditionOne, conditionTwo ])`
Every condition (all conditions) must be true.

#### `notEvery([ condition, conditionOne, conditionTwo ])`
Every condition can't be true.

#### `some([ condition, conditionOne, conditionTwo ])`
Some condition must be true.

#### `notSome([ condition, conditionOne, conditionTwo ])`
Some condition can't be true.

## Examples:

Simple:
```js
import { every, some } from 'conducer'

export const hasRole = role => ({ user }) => user.roles.some(role)
export const isActiveUser = ({ user: { status } }) => status

const canEditComments = every([
  isActiveUser,
  some([
    hasRole('admin'),
    hasRole('moderator'),
  ])
])

const facts = { user: { status: true, roles: ['moderator', 'admin'] } }

if (canEditComments(facts)) {
  // Give access to edit comments.
}
else {
  // Denied access to editing comments.
}
```

Using the `when()` chaining function to avoid `if` conditions:

```js
import { every, some, when } from 'conducer'

// ... same as above.

when(canEditComments(facts))
  .do(() => {
    // Give access to edit comments.
  })
  .else(() => {
    // Denied access to editing comments.
  })
```

## Usage:
- [Tests](https://github.com/choko-org/conducer/tree/master/src/__tests__/index.js).

# LICENSE
[MIT](LICENSE.md)
