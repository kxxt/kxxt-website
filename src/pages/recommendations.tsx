import * as React from "react"
import { useMemo, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import type { PageProps } from "gatsby"
import type { IconProp } from "@fortawesome/fontawesome-svg-core"
import type { IGatsbyImageData } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowUpRightFromSquare,
  faBookOpen,
  faFilm,
  faGamepad,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"

import IconText from "@/components/icon-text"
import { Layout, HeadWithNavBarTop } from "@/components/layout"
import RecommendationGallery from "@/components/recommendation-gallery/recommendation-gallery"
import Tags from "@/components/tags/tags"
import recommendations from "@/data/recommendations"
import type {
  Recommendation,
  RecommendationCategory,
  RecommendationImage,
  RecommendationSectionDetails,
} from "@/data/recommendations/types"
import type { RecommendationGalleryImage } from "@/components/recommendation-gallery/recommendation-gallery"

import "../admonition.scss"
import * as styles from "./recommendations.module.scss"

interface CategoryDetails {
  label: string
  singular: string
  icon: IconProp
  tagClass: string
}

type FilterCategory = "all" | RecommendationCategory

interface RecommendationGroup {
  key: string | null
  section?: RecommendationSectionDetails
  items: Recommendation[]
}

const categoryDetails: Record<RecommendationCategory, CategoryDetails> = {
  books: {
    label: "Books",
    singular: "Book",
    icon: faBookOpen,
    tagClass: "is-link",
  },
  games: {
    label: "Games",
    singular: "Game",
    icon: faGamepad,
    tagClass: "is-success",
  },
  documentaries: {
    label: "Documentaries",
    singular: "Documentary",
    icon: faFilm,
    tagClass: "is-warning",
  },
}

const categories = ["all", "books", "games", "documentaries"] as const
const filterDetails: Record<
  FilterCategory,
  { label: string; icon?: IconProp; tagClass?: string }
> = {
  all: { label: "Everything" },
  ...categoryDetails,
}

const normalizeImagePath = (path: string) =>
  path.replace(/^\/+/, "").replace(/^src\/images\//, "")

export function Head() {
  return (
    <HeadWithNavBarTop
      title="Recommendations"
      description="Books, games, and documentaries that kxxt recommends."
    />
  )
}

const RecommendationCard = ({
  imageMap,
  item,
}: {
  imageMap: ReadonlyMap<string, IGatsbyImageData>
  item: Recommendation
}) => {
  const category = categoryDetails[item.category]
  const Title = item.section ? "h3" : "h2"
  const resolveImage = (
    image: RecommendationImage,
    field: string,
  ): RecommendationGalleryImage => {
    if (!image?.src) {
      throw new Error(
        `Recommendation "${item.title}" has an invalid ${field}; expected an image object with a src.`,
      )
    }

    const relativePath = normalizeImagePath(image.src)
    const imageData = imageMap.get(relativePath)

    if (!imageData) {
      throw new Error(
        `Recommendation "${item.title}" references missing image "${image.src}". Add it at "src/images/${relativePath}" or fix the path.`,
      )
    }

    return { ...image, imageData }
  }
  const galleryImages = (item.images || []).map((image, index) =>
    resolveImage(image, `images[${index}]`),
  )
  const fallbackImage = item.image ? resolveImage(item.image, "image") : null

  return (
    <article className={`card ${styles.card}`}>
      <RecommendationGallery
        images={galleryImages}
        fallbackImage={fallbackImage}
        title={item.title}
      />

      <div className={`card-content ${styles.cardContent}`}>
        <div className={styles.cardHeading}>
          <div>
            <Title className="title is-4 is-spaced">{item.title}</Title>
            <p className="subtitle is-6">
              {item.creator} <span aria-hidden="true">·</span> {item.year}
            </p>
          </div>
          <span className={`tag ${category.tagClass}`}>
            <IconText icon={category.icon}>{category.singular}</IconText>
          </span>
        </div>

        <div className="content">
          <p>{item.description}</p>
        </div>

        <Tags tags={item.tags} withLink={false} fontSize="12px" />
      </div>

      <footer className="card-footer">
        <a
          className="card-footer-item clear"
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Learn more about ${item.title} (opens in a new tab)`}
        >
          <IconText icon={faArrowUpRightFromSquare}>Learn more</IconText>
        </a>
      </footer>
    </article>
  )
}

const RecommendationsPage = ({ location }: PageProps) => {
  const imageData = useStaticQuery<Queries.RecommendationImagesQuery>(graphql`
    query RecommendationImages {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              width: 900
              aspectRatio: 1.7777777778
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `)
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all")
  const [query, setQuery] = useState("")
  const imageMap = useMemo(
    () =>
      new Map<string, IGatsbyImageData>(
        imageData.allFile.nodes.flatMap(image =>
          image.childImageSharp?.gatsbyImageData
            ? [
                [
                  image.relativePath,
                  image.childImageSharp.gatsbyImageData,
                ] as const,
              ]
            : [],
        ),
      ),
    [imageData.allFile.nodes],
  )

  const categoryCounts = useMemo(
    () =>
      recommendations.reduce<Record<FilterCategory, number>>(
        (counts, item) => ({
          ...counts,
          [item.category]: (counts[item.category] || 0) + 1,
        }),
        { all: recommendations.length, books: 0, games: 0, documentaries: 0 },
      ),
    [],
  )

  const visibleRecommendations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return recommendations.filter(item => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory
      const searchableText = [
        item.title,
        item.creator,
        item.description,
        item.section?.title,
        item.section?.description,
        ...(item.tags || []),
      ]
        .join(" ")
        .toLowerCase()

      return matchesCategory && searchableText.includes(normalizedQuery)
    })
  }, [activeCategory, query])

  const visibleGroups = useMemo(() => {
    return visibleRecommendations.reduce<RecommendationGroup[]>(
      (groups, item) => {
        const groupKey = item.section?.key || null
        const previousGroup = groups[groups.length - 1]

        if (previousGroup && previousGroup.key === groupKey) {
          previousGroup.items.push(item)
        } else {
          groups.push({
            key: groupKey,
            section: item.section,
            items: [item],
          })
        }

        return groups
      },
      [],
    )
  }, [visibleRecommendations])

  const clearFilters = () => {
    setActiveCategory("all")
    setQuery("")
  }

  return (
    <Layout location={location}>
      <h1 className="title">Recommendations</h1>
      <p className="subtitle is-6">
        Books, games, documentaries, and other things I think are worth your
        time.
      </p>

      <div className="blog-post">
        <div className="admonition warning" role="note">
          <p className="admonition-title">Warning</p>
          <p>May contain AI generated descriptions</p>
        </div>
      </div>

      <div className={`box ${styles.controls}`}>
        <div className={styles.searchControl}>
          <label className="label" htmlFor="recommendation-search">
            Search
          </label>
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <input
                id="recommendation-search"
                className="input"
                type="search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search recommendations"
              />
              <span className="icon is-left">
                <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
              </span>
            </div>
            {query && (
              <div className="control">
                <button
                  className="button"
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <span className="label">Category</span>
          <div className="buttons are-small">
            {categories.map(category => {
              const details = filterDetails[category]
              const isActive = category === activeCategory
              const categoryColor = details.tagClass
                ? `${details.tagClass}${isActive ? "" : " is-light"}`
                : isActive
                  ? "is-dark"
                  : ""

              return (
                <button
                  type="button"
                  key={category}
                  className={`button ${categoryColor}`}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                >
                  {details.icon && (
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={details.icon} aria-hidden="true" />
                    </span>
                  )}
                  <span>
                    {details.label} ({categoryCounts[category]})
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className={styles.resultCount} aria-live="polite">
        Showing {visibleRecommendations.length}{" "}
        {visibleRecommendations.length === 1
          ? "recommendation"
          : "recommendations"}
      </p>

      {visibleRecommendations.length > 0 ? (
        <div>
          {visibleGroups.map((group, groupIndex) => (
            <div
              className={styles.recommendationGroup}
              key={group.key || `standalone-${groupIndex}`}
            >
              {group.section && (
                <header className={styles.sectionHeading}>
                  <h2 className="title is-4">{group.section.title}</h2>
                  {group.section.description && (
                    <p className="subtitle is-6">{group.section.description}</p>
                  )}
                </header>
              )}

              <div className="columns is-multiline">
                {group.items.map(item => (
                  <div
                    className={`column is-6-tablet is-4-widescreen ${styles.cardColumn}`}
                    key={item.entryKey}
                  >
                    <RecommendationCard imageMap={imageMap} item={item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="notification is-light has-text-centered">
          <h2 className="title is-4">No recommendations found</h2>
          <p className="mb-4">Try another category or a broader search.</p>
          <button
            className="button is-primary"
            type="button"
            onClick={clearFilters}
          >
            Show everything
          </button>
        </div>
      )}
    </Layout>
  )
}

export default RecommendationsPage
