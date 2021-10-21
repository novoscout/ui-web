const breakpoint = {
  xs: "0px",
  sm: "30rem",
  md: "40rem",
  lg: "50rem",
  xl: "60rem"
}      

const mq = {
  breakpoint: breakpoint,
  xs: "@media screen and (min-width: " + breakpoint.xs + ")",
  sm: "@media screen and (min-width: " + breakpoint.sm + ")",
  md: "@media screen and (min-width: " + breakpoint.md + ")",
  lg: "@media screen and (min-width: " + breakpoint.lg + ")",
  xl: "@media screen and (min-width: " + breakpoint.xl + ")"
}

export default mq
export { mq }
