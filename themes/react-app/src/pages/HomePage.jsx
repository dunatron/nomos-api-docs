import React, { Component } from "react"
import { withStyles } from "material-ui/styles"

const styles = {
  cardHolder: {
    display: "flex",
    "align-items": "center",
    overflow: "auto",
    "box-sizing": "border-box",
    width: "100%",
    "justify-content": "center",
    "flex-direction": "row",
    "flex-wrap": "wrap",
    "flex-flow": "row wrap",
    "align-content": "flex-end",
  },
}

class HomePage extends Component {
  render() {
    const { classes } = this.props

    return <div>Home Page</div>
  }
}

export default HomePage
