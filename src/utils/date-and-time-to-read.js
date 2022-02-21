const formatDateAndTimeToRead = (date, timeToRead) => {
  return date ? `${date} · ${timeToRead} min read` : `${timeToRead} min read`
}

export default formatDateAndTimeToRead
