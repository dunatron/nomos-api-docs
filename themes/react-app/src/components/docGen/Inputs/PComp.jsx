import React, { Component, Fragment } from "react"
import { Draggable } from "react-beautiful-dnd"
import { withStyles } from "material-ui/styles"
import Input from "material-ui/Input/Input"
import DisplayMarkdown from "../DisplayMarkdown"

const styles = theme => ({
  input: {
    fontSize: "11px",
    width: "100%",
  },
})

class PComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: this.props.contents,
      fontSize: 13,
      fontColor: "#00bfff",
    }
  }

  onChange = value => {
    this.setState({
      contents: value,
    })
  }

  render() {
    const { index, percentage, classes } = this.props
    const { contents, fontSize, fontColor } = this.state

    const calculatedFontSize = fontSize * (percentage / 100)

    return (
      <div>
        <Draggable draggableId={`p-draggable-${index}`} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <Input
                className={classes.input}
                style={{
                  fontSize: `${calculatedFontSize}px`,
                  color: fontColor,
                }}
                multiline={true}
                type="text"
                value={contents}
                onChange={e => this.onChange(e.target.value)}
              />
              <DisplayMarkdown />
            </div>
          )}
        </Draggable>
      </div>
    )
  }
}

export default withStyles(styles)(PComp)
