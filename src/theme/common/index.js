// No colo(u)rs are defined in the common theme. The are *only* defined in the
// light/dark themes.

import mq from "./mq"

const common = {
  container: {
    display: "block",
  },
  desk: {
    position: "relative",
    display: "block",
    width: "100%",
    margin: "0",
    padding: "0",
    flex: "100%",
  },
  nav: {
    // ems not rems in nav.
    boxSizing: "content-box",
    display: "block",
    margin: "0 auto",
    padding: 0,
    border: 0,
    height: "2em",
    minHeight: "2em",
    maxHeight: "2em",
    width: "100%",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  navTitle: {
    display: "inline-block",
    margin: 0,
    position: "relative",
    padding: "0 auto",
    lineHeight: "1.5em",
    fontSize: "1.5em",
    width: "100%",
  },
  navMenu: {
    // display: "inline-block",
    display: "none",
    visibility: "hidden",
    position: "relative",
    margin: 0,
    padding: 0,
    height: "100%",
    // width: "60%",
    // lineHeight: "1em",
    listStyle: "none",
    " ul": {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      margin: 0,
      padding: "0 1em 0 0",
      height: "100%",
      justifyContent: "space-evenly",
      // lineHeight: "1em",
      listStyle: "none",
    },
    " ul > li": {
      display: "inline-block",
      height: "100%",
      margin: "auto 0 auto 1rem",
      // position: "relative"
      listStyle: "none",
    },
  },
  navAction: {
    display: "",
    cursor: "pointer",
    height: "100%",
    margin: "0 auto",
    padding: 0,
    border: 0,
    textAlign: "center",
    textDecoration: "none",
    " span": {
      textDecoration: "none",
    }
  },
  navActionIcon: {
    margin: "auto 0 auto 2rem !important"
  },
  navActionText: {
    display: "none",
    visibility: "hidden",
  },
  // navActionTheme: {
  //   cursor: "pointer",
  //   position: "absolute",
  //   height: "4rem",
  //   width: "12rem",
  //   bottom: "10rem",
  //   right: 0,
  //   margin: 0,
  //   padding: 0,
  //   border: 0,
  //   borderRadius: "1rem",
  //   textAlign: "center",
  //   lineHeight: "4rem",
  //   textDecoration: "none",
  // },
  // navTitle: { display: "none" },
  // swiper: {
  //   frame: {
  //     display: "block",
  //     height: "100vh",
  //     margin: 0,
  //     padding: 0,
  //     position: "absolute",
  //     touchAction: "pan-x pan-y pinch-zoom",
  //     width: "100%",
  //   },
  //   inner: {
  //     display: "block",
  //     height: "100%",
  //     margin: "auto",
  //     maxHeight: "100%",
  //     overflowY: "scroll",
  //     padding: "1rem",
  //     position: "relative",
  //     top: 0,
  //     ":last-child": {
  //       paddingBottom: "6rem"
  //     }
  //   }
  // }
  swiper: {
    frame: {
      display: "block",
      overflowY: "scroll",
      padding: "1rem",
      width: "100%",
      position: "absolute",
      height: "100%",
    }
  }
}

common.navActionIdent = common.navAction;
common.navActionShare = common.navAction;
common.navActionTheme = common.navAction;

// Media queries.

common.swiper.frame[mq.sm] = {
  // This allows content to scroll onto the bottom of
  // the screen in Safari on iOS. FIXME!
  paddingBottom: "4rem",
}

common.container[mq.md] = {
  maxWidth: mq.breakpoint.lg + " !important",
  margin: "0 auto",
}

common.navTitle[mq.sm] = {
  textAlign: "left",
  margin: "auto auto auto 1rem"
}

common.navMenu[mq.sm] = {
  display: "inline-block",
  visibility: "visible"
}

common.navActionText[mq.md] = {
  display: "inline",
  visibility: "visible",
}

common.navActionIcon[mq.md] = {
  navActionIcon: {
    margin: 0
  }
}

export default common
export { common }
