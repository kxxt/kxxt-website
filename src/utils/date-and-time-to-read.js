const formatDateAndTimeToRead = (date, timeToRead) => {
  if (date == null) return timeToRead
  date = new Date(date)
  return `${date.toLocaleDateString()} · ${timeToRead}`
}

export default formatDateAndTimeToRead
