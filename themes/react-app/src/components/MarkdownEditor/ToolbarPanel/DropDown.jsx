import React from "react"
import PropTypes from "prop-types"
import { MenuItem, IconMenu } from "material-ui/Menu"
import IconButton from "material-ui/IconButton"

const DropDown = ({ icon, style, options, onItemTouchTap }) => (
  <IconMenu
    onItemTouchTap={onItemTouchTap}
    iconButtonElement={<IconButton style={style}>{icon}</IconButton>}>
    {options.map((option, i) => (
      <MenuItem key={i} {...option} />
    ))}
  </IconMenu>
)

DropDown.propTypes = {
  icon: PropTypes.element,
  onItemTouchTap: PropTypes.func,
  style: PropTypes.object, //eslint-disable-line
  options: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object, //eslint-disable-line
      primaryText: PropTypes.string,
    })
  ),
}

export default DropDown
