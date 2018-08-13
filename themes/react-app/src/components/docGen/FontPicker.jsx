import React, { Component, Fragment } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"

const styles = theme => ({})

const FontPicker = props => {
  const { classes } = props
  return (
    <Fragment>
      <Droppable droppableId="fontDragAndDrop">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            }}
            {...provided.droppableProps}>
            <Draggable draggableId="dragable-font-0" index={0}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    type="submit"
                    onClick={e => alert("add drag n Drop")}>
                    H1
                  </Button>
                </div>
              )}
            </Draggable>
            <Draggable draggableId="dragable-font-1" index={1}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}>
                  <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    type="submit"
                    onClick={e => alert("add drag n Drop")}>
                    P
                  </Button>
                </div>
              )}
            </Draggable>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Fragment>
  )
}

export default withStyles(styles)(FontPicker)
