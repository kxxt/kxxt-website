// Images are optional. Put local files in src/images/recommendations and add:
// images: [
//   { src: "recommendations/example-1.webp", alt: "Describe image one" },
//   { src: "recommendations/example-2.webp", alt: "Describe image two" },
// ],
import type { RecommendationCollection } from "./types"

const documentaries: RecommendationCollection = {
  items: [
    {
      title: "The Internet’s Own Boy: The Story of Aaron Swartz",
      creator: "Brian Knappenberger",
      year: "2014",
      description:
        "A portrait of Aaron Swartz and a clear-eyed account of open access, online activism, and disproportionate prosecution.",
      tags: ["Internet", "Open access", "Activism"],
      url: "https://www.internetsownboy.com/",
    },
  ],
  // Add named groups using { title, description?, items: [...] }.
  sections: [],
}

export default documentaries
