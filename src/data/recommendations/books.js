// Images are optional. Put local files in src/images/recommendations and add:
// images: [
//   { src: "recommendations/example-1.webp", alt: "Describe image one" },
//   { src: "recommendations/example-2.webp", alt: "Describe image two" },
// ],
const books = {
  items: [
    {
      title: "A Philosophy of Software Design",
      creator: "John Ousterhout",
      year: "2021",
      description:
        "A compact, opinionated guide to managing complexity and designing software that remains understandable as it grows.",
      tags: ["Software", "Design", "Engineering"],
      url: "https://web.stanford.edu/~ouster/cgi-bin/book.php",
    },
    {
      title: "The Design of Everyday Things",
      creator: "Don Norman",
      year: "2013",
      description:
        "An inviting introduction to affordances, feedback, and why confusing objects are usually a design problem—not a user problem.",
      tags: ["Design", "Psychology", "UX"],
      url: "https://mitpress.mit.edu/9780262525671/the-design-of-everyday-things/",
    },
    {
      title: "The Three-Body Problem",
      creator: "Liu Cixin",
      year: "2008",
      description:
        "Hard science fiction that moves from the upheaval of the Cultural Revolution to questions on a genuinely cosmic scale.",
      tags: ["Science fiction", "First contact", "China"],
      url: "https://us.macmillan.com/books/9780765382030/thethreebodyproblem/",
    },
  ],
  // Add named groups using { title, description?, items: [...] }.
  sections: [],
}

export default books
