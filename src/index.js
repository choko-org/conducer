export const every = conditions => facts => conditions.every(condition => condition(facts))
export const some = conditions => facts => conditions.some(condition => condition(facts))
export const notEvery = conditions => facts => !every(conditions)(facts)
export const notSome = conditions => facts => !some(conditions)(facts)

export function when (result) {
  const reactions = {
    do: fn => {
      if (result) fn(result)
      return reactions
    },
    else: fn => {
      if (!result) fn(result)
      return reactions
    },
  }
  return reactions
}
