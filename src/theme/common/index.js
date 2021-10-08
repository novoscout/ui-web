import colour from "./colour"

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
