const formatDateAndTimeToRead = (date, timeToRead) => {
  if (date && timeToRead) {
    return `${date} · ${timeToRead} min read`
  } else if (date) {
    return date
  } else if (timeToRead) {
    return `${timeToRead} min read`
  } else {
    throw new Error("date and timeToRead are both not provided!")
  }
}

export default formatDateAndTimeToRead
