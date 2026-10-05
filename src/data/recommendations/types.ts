export type RecommendationCategory = "books" | "games" | "documentaries"

export interface RecommendationImage {
  src: string
  alt?: string
}

export interface RecommendationItem {
  title: string
  creator: string
  year: string
  description: string
  tags: readonly string[]
  url: string
  image?: RecommendationImage
  images?: readonly RecommendationImage[]
}

export interface RecommendationSection {
  title: string
  description?: string
  items: readonly RecommendationItem[]
}

export interface RecommendationCollection {
  items: readonly RecommendationItem[]
  sections: readonly RecommendationSection[]
}

export type RecommendationSectionDetails = Omit<
  RecommendationSection,
  "items"
> & {
  key: string
}

export interface Recommendation extends RecommendationItem {
  category: RecommendationCategory
  entryKey: string
  section?: RecommendationSectionDetails
}
