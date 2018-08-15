import React from "react"

const ToolBarMenu = () => {
  return <div>THE FUCKEN TOOLBAR MENIU</div>
}

export default ToolBarMenu

// import PropTypes from "prop-types"
// import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar"
// import ToolbarSection from "./ToolbarSection"
// import getButtonsSchema from "./buttonsSchema"

// const ToolbarPanel = ({ cm, tokens, title }) => (
//   <Toolbar>
//     <ToolbarGroup firstChild>
//       {getButtonsSchema(cm, tokens).map((section, i) => (
//         <ToolbarSection key={i} items={section} />
//       ))}
//     </ToolbarGroup>
//     <ToolbarGroup>
//       <ToolbarTitle text={title} />
//     </ToolbarGroup>
//   </Toolbar>
// )

// ToolbarPanel.propTypes = {
//   cm: PropTypes.object, //eslint-disable-line
//   tokens: PropTypes.arrayOf(PropTypes.string),
//   title: PropTypes.string,
// }

// export default ToolbarPanel

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
