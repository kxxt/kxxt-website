const serializeMetaData = metaData => {
  const { date, ...others } = metaData
  return {
    date: String(date),
    ...others,
  }
}

const deserializeMetaData = metaData => {
  const { date, ...others } = metaData
  return {
    date: new Date(date),
    ...others,
  }
}

export { serializeMetaData, deserializeMetaData }
