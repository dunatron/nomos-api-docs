import React, { Component } from "react"
// page layout
import DoublePanelLayout from "../layouts/DoublePanel"
// page containers
// import MainContainer from "../containers/MainContainer"
import CurrentMethodContainer from "../containers/CurrentMethodContainer"
import CodeExamples from "../containers/CodeExamples"
import MethodNotesContainer from "../containers/MethodNotesContainer"

class HomePage extends Component {
  render() {
    return (
      <DoublePanelLayout
        leftSection={[
          <CurrentMethodContainer />,
          <div>left component 1</div>,
          <div>left component 2</div>,
          <div>left component 3</div>,
          <div>left component 4</div>,
        ]}
        rightSection={[
          <CodeExamples />,
          <div>right component 1</div>,
          <div>right component 2</div>,
        ]}
      />
    )
  }
}

export default HomePage
