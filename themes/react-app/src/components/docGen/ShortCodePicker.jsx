import React, { Component, Fragment } from "react"
import { Draggable } from "react-beautiful-dnd"
import { withStyles } from "material-ui/styles"

const styles = theme => ({
  input: {
    fontSize: "36px",
    width: "100%",
  },
})

class ShortCodePicker extends Component {
  render() {
    const { shortCodes } = this.props
    
    return (
      <div>
        <h2>Short Codes</h2>
        <ul>
          {shortCodes.map(shortCode => {
            return (
              <li>
                name: {shortCode.name} value: {shortCode.value}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default withStyles(styles)(ShortCodePicker)
