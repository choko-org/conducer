# Conducer
Minimal tools for creating rules with conditions using simple reducers.
Conditions are pure functions, so there's side-effects.
Facts must have everything needed by the conditions.

## Tools:
They return booleans.

#### `every([ condition, conditionOne, conditionTwo ])`
Every condition (all conditions) must be true.

#### `notEvery([ condition, conditionOne, conditionTwo ])`
Every condition can't be true.

#### `some([ condition, conditionOne, conditionTwo ])`
Some condition must be true.

#### `notSome([ condition, conditionOne, conditionTwo ])`
Some condition can't be true.

## Example:

Simple:
```js
import { every, some } from 'conducer'

import { hasRole, isActiveUser } form './libs/user'

const facts = { user: { status: true, roles: ['moderator', 'admin'] } }

const canEditComments = every([
  isActiveUser,
  some([
    hasRole('admin'),
    hasRole('moderator'),
  ])
])

if (canEditComments(facts)) {
  // Give access to edit comments.
}
else {
  // Denied access to editing comments.
}
```

Using the `when()` chaining function to avoid `if` conditions:
## Example:
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
