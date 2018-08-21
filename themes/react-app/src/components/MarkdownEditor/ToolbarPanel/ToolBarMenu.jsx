import React from "react"
import PropTypes from "prop-types"
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui"

// import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar"
import ToolbarSection from "./ToolbarSection"
import getButtonsSchema from "./buttonsSchema"

// const ToolBarMenu = () => {
//   return <div>THE FUCKEN TOOLBAR MENIU</div>
// }

// export default ToolBarMenu

// import PropTypes from "prop-types"
// import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar"
// import ToolbarSection from "./ToolbarSection"
// import getButtonsSchema from "./buttonsSchema"

/**
 *
 * We will have to pass our own config into this
 */
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
      return <ToolbarSection key={i} items={section} />
    })}
  </Toolbar>
)

ToolbarPanel.propTypes = {
  cm: PropTypes.object, //eslint-disable-line
  tokens: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}

export default ToolbarPanel

// export default class ToolBarMenu extends React.Component {
//   static propTypes = {
//     cm: PropTypes.object, //eslint-disable-line
//     tokens: PropTypes.arrayOf(PropTypes.string),
//     title: PropTypes.string,
//   }

//   static contextTypes = {
//     toggleDialog: PropTypes.func,
//   }

//   render() {
//     const { cm, tokens, title } = this.props
//     return (
//       <Toolbar>
//         <ToolbarGroup firstChild>
//           {getButtonsSchema(cm, tokens).map((section, i) => (
//             <ToolbarSection key={i} items={section} />
//           ))}
//         </ToolbarGroup>
//         <ToolbarGroup>
//           <ToolbarTitle text={title} />
//         </ToolbarGroup>
//       </Toolbar>
//     )
//   }
// }
