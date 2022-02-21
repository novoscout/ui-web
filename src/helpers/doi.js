const DOI = (d) => {
  if (! d) {
    console.warn("Could not parse DOI.");
    return undefined;
  }
  return String(d).toLowerCase()
}

export default DOI;
export { DOI }
