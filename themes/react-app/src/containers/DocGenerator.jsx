import React, { Component, Fragment } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { connect } from "react-redux"
import { withApollo, compose } from "react-apollo"
import KeyHandler, { KEYPRESS } from "react-key-handler"
import { updatePagePercentage } from "../actions/docGenActions"

// Components
import DocumentCanvas from "../components/docGen/DocumentCanvas"
import PagePercentage from "../components/docGen/PagePercentage"
import FontPicker from "../components/docGen/FontPicker"
import StyleSettings from "../components/docGen/StyleSettings"

/**
 *
 * For this drag and drop to work for this mini application ->
 * - DragDropContext or perhaps Droppable can be used on the fontPicker and page Picker. Can reorder whatever. Nice touch but...
 * - the main point is to drag these elements onto other drag and drop contexts, in particular the one that wil be our canvas.
 * as it will decide what to do with these. I.e It will initialise new components base on type in the canvas
 *  - The idea of a fontMutator for every component
 *
 * More: The idea that markdown is a kind of raw language to write in. Soooo we have our own components encapsulating these which transform the text.
 * We can then use the attributes on these components to build
 */
const getDroppableClasses = isDraggingOver =>
  classNames(styles.droppable, {
    [styles.isDraggingOver]: isDraggingOver,
  })

const getDraggableClasses = isDragging =>
  classNames(styles.draggable, {
    [styles.isDragging]: isDragging,
  })

class DocGenerator extends Component {
  state = {}

  constructor(props) {
    super(props)

    this.state = {
      started: false,
      screenDPI: 96,
      documentComponents: [
        { type: "p", content: "Hi I am the contents of a paragraph component" },
      ],
    }
  }

  startDocument = v => {
    // this.state({
    //   started: true,
    // })
    console.log("pressed props", v)
    console.log("Key val pressed ", v.key)
    this.setState({
      started: true,
    })
  }

  renderPage = screenDPI => {
    switch (screenDPI) {
      case 72:
        return
      case 96:
        return {
          width: 794,
          height: 1123,
        }
      case 150:
        return
      case 300:
        return
      case 600:
        return
      case 720:
        return
      case 1200:
        return
      case 1440:
        return
      case 2400:
        return
      case 2880:
        return

      default:
        return
    }
  }

  onDragEnd = result => {
    console.log("onDragEnd Finished ", result)
    if (result.type === "DocumentCanvas") {
      console.log("attempting to add new theng to canvas")
      let docComps = this.state.documentComponents
      docComps.push({ type: "h1", content: "an h1 font component" })
      this.setState({
        documentComponents: docComps,
      })
    }
    // const { destination, draggableId } = result
    // if (!destination) {
    //   return
    // }
    // this.props.onMove(draggableId, destination.index)
  }

  onDragStart = () => {
    console.log("onDragStart start ")
    // if (window.navigator.vibrate) {
    //   window.navigator.vibrate(100)
    // }
  }

  renderDocumentGenerator = () => {
    const { screenDPI } = this.state
    const { docGen } = this.props
    const { pageAttributes } = docGen
    const pageDimensions = this.renderPage(screenDPI)

    const calculatedPageHeight =
      pageAttributes.pageHeight * (pageAttributes.percentage / 100)

    const calculatedPageWidth =
      pageAttributes.pageWidth * (pageAttributes.percentage / 100)

    const h1FontSiz = 36 * (pageAttributes.percentage / 100)
    const pFontStyle = 13 * (pageAttributes.percentage / 100)

    console.log("calculatedPageHeight ", calculatedPageHeight)
    console.log("DOc generator STATE ", this.state)

    console.log("pageDimensions ", pageDimensions)
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}>
        <div>
          <FontPicker />
          <StyleSettings />
          <PagePercentage
            percentage={pageAttributes.percentage}
            onChange={v => {
              console.log("Trying to change percentage ", v)
              this.props.updatePagePercentage(v)
            }}
          />
          <DocumentCanvas
            documentComponents={this.state.documentComponents}
            pageAttributes={pageAttributes}
            pageDimensions={{
              height: calculatedPageHeight,
              width: calculatedPageWidth,
            }}
          />
          <div
            style={{
              border: "1px solid purple",
              height: `${calculatedPageHeight}px`,
              width: `${calculatedPageWidth}px`,
            }}>
            <h1 style={{ fontSize: `${h1FontSiz}px` }}>Static Page Title</h1>
            {this.state.documentComponents.map(docComponent => {
              return (
                <div>
                  <h1 style={{ fontSize: `${h1FontSiz}px` }}>
                    TYPE: {docComponent.type}
                  </h1>
                  <p style={{ fontSize: `${pFontStyle}px` }}>
                    contents: {docComponent.content}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </DragDropContext>
    )
  }

  /**
   * Key Press Docs: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
   */
  render() {
    const { started, keyPressConf } = this.state
    return (
      <Fragment>
        <div>The doc gen container. Press "enter" to start</div>
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="Enter"
          onKeyHandle={v => this.startDocument(v)}
        />
        {started && this.renderDocumentGenerator()}
      </Fragment>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    docGen: state.docGen,
  }),
  dispatch => ({
    updatePagePercentage: percentage =>
      dispatch(updatePagePercentage(percentage)),
  })
)

export default compose(
  withApollo,
  reduxWrapper
)(DocGenerator)
