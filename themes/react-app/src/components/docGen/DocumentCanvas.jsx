import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "material-ui/styles"

const styles = theme => ({})

const FontPicker = props => {
  const { classes } = props
  return (
    <Fragment>
      <Droppable droppableId="fontDragAndDrop" type="DocumentCanvas">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            }}
            {...provided.droppableProps}>
            <h1>This Is the Document Canvas. Pages</h1>
            <p>
              Pages Will Exist in here. Pages will be composed of components
              dropped ed in here. Inside of here it will get create its own
              components, ie H1, h2, p etc.
            </p>
            <p>
              Now we can save this canvas away with these created compionents.
              we save the type. and we will also roll up the state of each
              component. That way wen we recieve from server we can rinitialise
              these font components based on their type. And fill them with
              theior data. fontSize, color, style, and of course content
            </p>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  )
}

export default withStyles(styles)(FontPicker)
