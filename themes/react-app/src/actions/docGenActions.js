export function setDPI(dpi) {
  console.log("doc Gen action DPI")
  return {
    type: "SET_DPI",
    payload: dpi,
  }
}
