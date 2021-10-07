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
      padding: "1rem",
      position: "absolute",
      touchAction: "pan-x pan-y pinch-zoom",
      width: "100vw",
    },
    inner: {
      display: "block",
      height: "88%",
      margin: "4% auto auto auto",
      maxHeight: "88%",
      overflowY: "scroll",
      position: "relative",
      width: "90%",
      top: 0
    }
  }
}

export default common
export { common }
