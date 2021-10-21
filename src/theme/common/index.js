// No colo(u)rs are defined in the common theme. The are *only* defined in the
// light/dark themes.

const common = {
  desk: {
    display: "block",
    position: "relative",
    height: "100%",
    maxHeight: "100vh",
    maxWidth: "100vw",
    minHeight: "100vh",
    minWidth: "100vw",
    width: "100%",
  },
  nav: {
    position: "absolute",
    borderRadius: "50%",
    // zIndex: 1000, // Don't use. Instead, ensure it's place in DOM is after swipers.
    height: "4rem",
    width: "4rem",
    bottom: "1.5rem",
    right: "1.5rem",
    margin: 0,
    padding: 0,
    border: 0,
    ":after": {
      boxSizing: "content-box", // this is important!
      content: '"+"',
      display: "table",
      textAlign: "center",
      width: "100%",
      maxWidth: "100%",
      margin: "-1.1rem auto auto auto",
      fontSize: "3rem",
      height: "100%",
      maxHeight: "100%",
      overflow: "hidden",
    }
  },
  swiper: {
    frame: {
      display: "block",
      height: "100vh",
      margin: 0,
      padding: 0,
      position: "absolute",
      touchAction: "pan-x pan-y pinch-zoom",
      width: "100vw",
    },
    inner: {
      display: "block",
      height: "100%",
      margin: "auto",
      maxHeight: "100%",
      overflowY: "scroll",
      padding: "1rem 1rem 4rem 1rem",
      position: "relative",
      width: "100%",
      top: 0
    }
  }
}

export default common
export { common }
