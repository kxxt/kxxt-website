// Images are optional. Put local files in src/images/recommendations and add:
// images: [
//   { src: "recommendations/example-1.webp", alt: "Describe image one" },
//   { src: "recommendations/example-2.webp", alt: "Describe image two" },
// ],
const games = {
  items: [
    {
      title: "Outer Wilds",
      creator: "Mobius Digital",
      year: "2019",
      description:
        "A tiny solar system, a twenty-two-minute loop, and one enormous mystery where progress is measured entirely in what you learn.",
      tags: ["Exploration", "Mystery", "Space"],
      url: "https://www.mobiusdigitalgames.com/outer-wilds.html",
    },
    {
      title: "Return of the Obra Dinn",
      creator: "Lucas Pope",
      year: "2018",
      description:
        "An insurance investigation aboard a ghost ship, told through frozen moments and deductions you must make yourself.",
      tags: ["Deduction", "Mystery", "Indie"],
      url: "https://obradinn.com/",
    },
    {
      title: "Portal 2",
      creator: "Valve",
      year: "2011",
      description:
        "A wonderfully paced puzzle game where clever spatial mechanics share the stage with impeccable comic writing.",
      tags: ["Puzzle", "Co-op", "Comedy"],
      url: "https://www.thinkwithportals.com/",
    },
  ],
  sections: [
    // A section is useful for grouping several entries from one franchise:
    {
      title: "Portal",
      description: "An optional introduction to this section.",
      items: [
        {
          title: "Game title",
          creator: "Studio",
          year: "2026",
          description: "Why it is worth playing.",
          tags: ["Genre"],
          url: "https://example.com/",
        },
      ],
    },
  ],
}

export default games
