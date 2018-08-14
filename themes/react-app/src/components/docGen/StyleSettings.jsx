import React, { Component, Fragment } from "react"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button/Button"

const styles = theme => ({
  input: {
    fontSize: "72px",
    width: "100%",
  },
})

class StyleSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isItalic: false,
      isBold: true,
    }
  }

  onChange = (name, value) => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { classes } = this.props
    const { isItalic, isBold } = this.state

    return (
      <div>
        <Button
          variant={isItalic ? "raised" : "flat"}
          size="small"
          color="primary"
          onClick={() => {
            this.onChange("isItalic", !this.state.isItalic)
          }}
          className={classes.button}>
          Italics
        </Button>
        <Button
          variant={isBold ? "raised" : "flat"}
          size="small"
          color="primary"
          onClick={() => {
            this.onChange("isBold", !this.state.isBold)
          }}
          className={classes.button}>
          Bold
        </Button>

        <div>Bold</div>
        <div>fS: 36</div>
      </div>
    )
  }
}

export default withStyles(styles)(StyleSettings)
