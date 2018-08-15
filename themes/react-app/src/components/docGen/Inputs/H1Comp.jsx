import React, { Component, Fragment } from "react"
import { Draggable } from "react-beautiful-dnd"
import { withStyles } from "material-ui/styles"
import Input from "material-ui/Input/Input"
// import MarkdownEditor from "react-markdown-editor"
// const MarkdownEditor = require("react-markdown-editor").MarkdownEditor
import DisplayMarkdown from "../DisplayMarkdown"

import { MarkdownEditor } from "react-markdown-editor"

// var TestComponent = React.createClass({
//   render: function() {
//     return <MarkdownEditor initialContent="Test" iconsSet="font-awesome" />
//   },
// })

const styles = theme => ({
  input: {
    fontSize: "36px",
    width: "100%",
  },
})

class H1Comp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contents: this.props.contents,
      fontSize: 36,
      fontColor: "#00bfff",
      isFocused: false,
    }
  }

  onFocus = () => {
    console.log(
      "On Focus we will set the docGen actionBar to have the relevant containers state"
    )
    // There is a challenge here. We want to set the redux store state and update the state in here.
    // I think we can do this with some sort of ref perhaps?
    // nO NOT REALL. I STILL HAVE THE PROBLEM of wanting to update the state.
    // Ask tim? I want an action bar that has say, fontSize, color, fontFamily etc.
    // I want this to be help in the redux store and onBlur
    this.setState({
      isFocused: true,
    })
  }

  onBlur = () => {
    this.setState({
      isFocused: false,
    })
  }

  onChange = value => {
    this.setState({
      contents: value,
    })
  }

  render() {
    const { index, percentage, classes } = this.props
    const { contents, fontSize, fontColor, isFocused } = this.state

    const calculatedFontSize = fontSize * (percentage / 100)

    return (
      <div>
        <Draggable draggableId={`h1-draggable-${index}`} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
              <p>focused: {isFocused}</p>
              <Input
                onFocus={() => this.onFocus()}
                onBlur={() => this.onBlur()}
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
              <MarkdownEditor initialContent="test" iconsSet="font-awesome" />
              <DisplayMarkdown />
              {/* <MarkdownEditor
                initialContent={this.state.contents}
                iconsSet="materialize-ui"
              /> */}
            </div>
          )}
        </Draggable>
      </div>
    )
  }
}

export default withStyles(styles)(H1Comp)
