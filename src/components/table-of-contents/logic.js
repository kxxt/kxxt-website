export const getIds = (items, level) => {
  return items?.reduce(
    (acc, item) => {
      if (item.url) {
        // url has a # as first character, remove it to get the raw CSS-id
        acc.push({ id: item.url.slice(1), level })
      }
      if (item.items) acc.push(...getIds(item.items, level + 1))
      return acc
    },
    []
  )
}

export const getIdPaths = (items, parents = []) => {
  return items?.reduce(
    (acc, item) => {
      const id = item.url.slice(1)
      acc[id] = [...parents, id]
      if (item.items) {
        acc = {
          ...acc,
          ...getIdPaths(item.items, [...parents, id])
        }
      }
      return acc
    },
    {}
  )
}