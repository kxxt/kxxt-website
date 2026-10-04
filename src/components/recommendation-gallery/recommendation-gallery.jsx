import React, { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import * as styles from "./recommendation-gallery.module.scss"

const RecommendationGallery = ({ images = [], fallbackImage, title }) => {
  const galleryRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const galleryImages = (images.length ? images : [fallbackImage]).filter(
    image => image?.imageData && getImage(image.imageData),
  )

  if (!galleryImages.length) return null

  const scrollToImage = index => {
    const gallery = galleryRef.current
    if (!gallery) return

    const nextIndex = (index + galleryImages.length) % galleryImages.length
    gallery.scrollTo({
      left: gallery.clientWidth * nextIndex,
      behavior: "smooth",
    })
    setCurrentIndex(nextIndex)
  }

  const updateCurrentImage = event => {
    const gallery = event.currentTarget
    if (!gallery.clientWidth) return

    const nextIndex = Math.round(gallery.scrollLeft / gallery.clientWidth)
    if (nextIndex !== currentIndex) setCurrentIndex(nextIndex)
  }

  return (
    <div
      className={`card-image ${styles.gallery}`}
      role="region"
      aria-label={`${title} image gallery`}
    >
      <div
        className={styles.galleryTrack}
        ref={galleryRef}
        onScroll={updateCurrentImage}
      >
        {galleryImages.map((image, index) => (
          <figure className={styles.slide} key={`${image.src}-${index}`}>
            <GatsbyImage
              className={styles.galleryImage}
              image={getImage(image.imageData)}
              alt={image.alt || ""}
              objectFit="cover"
            />
          </figure>
        ))}
      </div>

      {galleryImages.length > 1 && (
        <>
          <button
            className={`button is-small ${styles.galleryControl} ${styles.previous}`}
            type="button"
            onClick={() => scrollToImage(currentIndex - 1)}
            aria-label={`Show previous image for ${title}`}
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          </button>
          <button
            className={`button is-small ${styles.galleryControl} ${styles.next}`}
            type="button"
            onClick={() => scrollToImage(currentIndex + 1)}
            aria-label={`Show next image for ${title}`}
          >
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>
          <span
            className={`tag is-dark ${styles.counter}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {currentIndex + 1} / {galleryImages.length}
          </span>
        </>
      )}
    </div>
  )
}

export default RecommendationGallery
