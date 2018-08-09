import React, { Component } from "react"
// page layout
import DoublePanelLayout from "../layouts/DoublePanel"
// page containers
// components
import PageLinks from "../components/PageLinks"

class HomePage extends Component {
  render() {
    return (
      <DoublePanelLayout
        leftSection={[
          <div>
            Most of the content is on other pages. Check the navigation in the
            top right
          </div>,
          <PageLinks />,
          <div>left component 2</div>,
          <div>left component 3</div>,
          <div>left component 4</div>,
        ]}
        rightSection={[
          <div>right component 1</div>,
          <div>right component 2</div>,
        ]}
      />
    )
  }
}

export default HomePage
