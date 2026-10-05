export interface TableOfContentsItem {
  url?: string
  title?: string
  items?: readonly TableOfContentsItem[]
}

export interface HeadingId {
  id: string
  level: number
}

export function parseTableOfContents(
  value: unknown,
): readonly TableOfContentsItem[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item: unknown) => {
    if (typeof item !== "object" || item === null) return []
    return [
      {
        url:
          "url" in item && typeof item.url === "string" ? item.url : undefined,
        title:
          "title" in item && typeof item.title === "string"
            ? item.title
            : undefined,
        items: "items" in item ? parseTableOfContents(item.items) : undefined,
      },
    ]
  })
}

export const getIds = (
  items: readonly TableOfContentsItem[] = [],
  level = 0,
): HeadingId[] => {
  return items.reduce<HeadingId[]>((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push({ id: item.url.slice(1), level })
    }
    if (item.items) acc.push(...getIds(item.items, level + 1))
    return acc
  }, [])
}

export const getIdPaths = (
  items: readonly TableOfContentsItem[] = [],
  parents: readonly string[] = [],
): Record<string, readonly string[]> => {
  return items.reduce<Record<string, readonly string[]>>((acc, item) => {
    const id = item.url?.slice(1)
    const path = id ? [...parents, id] : parents
    if (id) acc[id] = path
    if (item.items) {
      acc = {
        ...acc,
        ...getIdPaths(item.items, path),
      }
    }
    return acc
  }, {})
}
