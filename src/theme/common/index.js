// No colo(u)rs are defined in the common theme. The are *only* defined in the
// light/dark themes.

import mq from "./mq"

const common = {
  container: {
    display: "block",
  },
  desk: {
    display: "block",
    position: "relative",
  },
  nav: {

    // Nav bar components:
    " > div": {
      display: "flex",
      justifyContent: "space-between",
    },

    position: "absolute",
    borderRadius: "50%",
    // zIndex: 1000, // Don't use. Instead, ensure Nav is added to DOM after swipers.
    height: "4rem",
    width: "4rem",
    bottom: "4.5rem",
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
  navActionShare: { display: "none", textDecoration: "none" },
  navActionTheme: { display: "none", textDecoration: "none" },
  navTitle: { display: "none" },
  swiper: {
    frame: {
      display: "block",
      height: "100vh",
      margin: 0,
      padding: 0,
      position: "absolute",
      touchAction: "pan-x pan-y pinch-zoom",
      width: "100%",
    },
    inner: {
      display: "block",
      height: "100%",
      margin: "auto",
      maxHeight: "100%",
      overflowY: "scroll",
      padding: "1rem",
      position: "relative",
      top: 0,
      ":last-child": {
        paddingBottom: "6rem"
      }
    }
  }
}

// Media queries.

common.swiper.frame[mq.md] = {
  paddingBottom: "4rem",
}

common.desk[mq.md] = {
  marginTop: "4rem !important", // Make room for nav bar FIXME
}

common.nav[mq.md] = {
  position: "fixed",
  display: "block",
  borderRadius: 0,
  border: 0,
  borderBottomStyle: "solid",
  borderBottomWidth: "1px",
  left: 0,
  bottom: 0,
  margin: 0,
  right: 0,
  top: 0,
  width: "100%",
  minWidth: "100%",
  height: "4rem",
  maxHeight: "4rem",
  ":after": {
    boxSizing: "border-box", // this is important!
    content: '""',
    display: "none",
    textAlign: "inherit",
    margin: 0,
    fontSize: "inherit",
    height: 0,
    maxHeight: "100%",
    width: 0,
    maxWidth: 0,
    overflow: "hidden",
  }
}

common.navActionShare[mq.md] = {
  cursor: "pointer",
  display: "inline-block !important",
  margin: "1rem 30px 1rem 0 !important",
}

common.navActionTheme[mq.md] = {
  cursor: "pointer",
  display: "inline-block !important",
  margin: "1rem 30px 1rem 0 !important",
}

common.navTitle[mq.md] = {
  display: "inline-block !important",
  margin: "0 auto 0 0 !important",
}

common.container[mq.md] = {
  maxWidth: mq.breakpoint.lg + " !important",
  margin: "0 auto",
}

export default common
export { common }
