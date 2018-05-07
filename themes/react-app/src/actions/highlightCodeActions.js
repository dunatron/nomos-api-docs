export function setStyle(selected, style) {
  return {
    type: 'SET_STYLE',
    payload: {
      selected,
      style
    }
  }
}

export function toggleShowLineNumbers(value) {
  return {
    type: 'TOGGLE_LINE_NUMBERS',
    payload: value
  }
}

export function setFontSize(fs) {
  return {
    type: 'SET_FONT_SIZE',
    payload: Number(fs)
  }
}