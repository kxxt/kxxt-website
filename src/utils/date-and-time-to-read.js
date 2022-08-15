const formatDateAndTimeToRead = (date, timeToRead) => {
  if (date == null) return `${timeToRead} min read`
  date = new Date(date)
  return `${date.toLocaleDateString()} · ${timeToRead} min read`
}

export default formatDateAndTimeToRead
