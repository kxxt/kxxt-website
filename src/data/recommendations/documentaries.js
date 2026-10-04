// Images are optional. Put local files in src/images/recommendations and add:
// images: [
//   { src: "recommendations/example-1.webp", alt: "Describe image one" },
//   { src: "recommendations/example-2.webp", alt: "Describe image two" },
// ],
const documentaries = {
  items: [
    {
      title: "AlphaGo",
      creator: "Greg Kohs",
      year: "2017",
      description:
        "The match between Lee Sedol and DeepMind becomes a thoughtful human story about intuition, pressure, and machine creativity.",
      tags: ["AI", "Go", "Competition"],
      url: "https://www.alphagomovie.com/",
    },
    {
      title: "The Internet's Own Boy",
      creator: "Brian Knappenberger",
      year: "2014",
      description:
        "A portrait of Aaron Swartz and a clear-eyed account of open access, online activism, and disproportionate prosecution.",
      tags: ["Internet", "Open access", "Activism"],
      url: "https://www.internetsownboy.com/",
    },
    {
      title: "Free Solo",
      creator: "E. Chai Vasarhelyi & Jimmy Chin",
      year: "2018",
      description:
        "An intimate, vertiginous look at Alex Honnold's attempt to climb El Capitan without ropes or protective equipment.",
      tags: ["Climbing", "Adventure", "Portrait"],
      url: "https://films.nationalgeographic.com/free-solo",
    },
  ],
  // Add named groups using { title, description?, items: [...] }.
  sections: [],
}

export default documentaries
