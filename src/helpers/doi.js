const DOI = (d) => {
  if (! d) {
    console.warn("Unparseable DOI.");
    return undefined;
  }
  return String(d).toLowerCase()
}

export default DOI;
export { DOI }
