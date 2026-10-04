// Images are optional. Put local files in src/images/recommendations and add:
// images: [
//   { src: "recommendations/example-1.webp", alt: "Describe image one" },
//   { src: "recommendations/example-2.webp", alt: "Describe image two" },
// ],
const books = {
  items: [
    {
      title: "The Art of Thinking Clearly",
      creator: "Rolf Dobelli",
      year: "2013",
      description: "Common thinking errors definitely worth knowing.",
      tags: ["Non-fiction"],
      url: "https://en.wikipedia.org/wiki/The_Art_of_Thinking_Clearly",
    },
    {
      title: "1984",
      creator: "George Orwell",
      year: "1949",
      description: "I don't think I need to write a description for this book.",
      tags: ["Dystopia"],
      url: "https://en.wikipedia.org/wiki/Nineteen_Eighty-Four",
    },
    {
      title: "Animal Farm",
      creator: "George Orwell",
      year: "1945",
      description:
        "I read this book in my childhood by chance and it is really influential.",
      tags: ["Dystopia"],
      url: "https://en.wikipedia.org/wiki/Animal_Farm",
    },
    {
      title: "Fluent Python",
      creator: "Luciano Ramalho",
      year: "2022",
      description:
        "(If you are interested in Python)",
      tags: ["Python", "Programming"],
      url: "https://www.fluentpython.com/",
    },
  ],
  // Add named groups using { title, description?, items: [...] }.
  sections: [],
}

export default books
