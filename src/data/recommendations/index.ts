import books from "./books"
import documentaries from "./documentaries"
import games from "./games"
import type {
  Recommendation,
  RecommendationCategory,
  RecommendationCollection,
} from "./types"

const addCategory = (
  { items, sections }: RecommendationCollection,
  category: RecommendationCategory,
): Recommendation[] => [
  ...items.map((item, index) => ({
    ...item,
    category,
    entryKey: `${category}-item-${index}`,
  })),
  ...sections.flatMap((section, sectionIndex) => {
    const sectionDetails = {
      key: `${category}-section-${sectionIndex}`,
      title: section.title,
      description: section.description,
    }

    return (section.items || []).map((item, itemIndex) => ({
      ...item,
      category,
      section: sectionDetails,
      entryKey: `${sectionDetails.key}-item-${itemIndex}`,
    }))
  }),
]

const recommendations = [
  ...addCategory(books, "books"),
  ...addCategory(games, "games"),
  ...addCategory(documentaries, "documentaries"),
]

export default recommendations
