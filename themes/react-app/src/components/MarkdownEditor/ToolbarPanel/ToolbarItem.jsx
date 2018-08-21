import React from "react"
import PropTypes from "prop-types"
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui"

// import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar"
import ToolbarSection from "./ToolbarSection"
import getButtonsSchema from "./buttonsSchema"

const ToolbarPanel = ({ cm, tokens, title }) => (
  <Toolbar>
    {/* <ToolbarGroup firstChild>
      {getButtonsSchema(cm, tokens).map((section, i) => (
        <ToolbarSection key={i} items={section} />
      ))}
    </ToolbarGroup>
    <ToolbarGroup>
      <ToolbarTitle text={title} />
    </ToolbarGroup> */}
    {/* {getButtonsSchema(cm, tokens).map((section, i) => (
        <ToolbarSection key={i} items={section} />
      ))} */}
    {getButtonsSchema(cm, tokens).map((section, i) => {
      console.log("A section ", section)
      return <div>tool sect.</div>
    })}
  </Toolbar>
)

ToolbarPanel.propTypes = {
  cm: PropTypes.object, //eslint-disable-line
  tokens: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}

export default ToolbarPanel