import React from "react"
import PropTypes from "prop-types"
import FlatButton from "material-ui/Button"

const Button = (
  { onClick, style, icon, openDialog, isImageDialog },
  { toggleDialog }
) => (
  <FlatButton
    onClick={openDialog ? toggleDialog(isImageDialog) : onClick} //eslint-disable-line
    style={{ ...style, minWidth: "36px" }}
    icon={icon}
  />
)

Button.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.func,
  isImageDialog: PropTypes.bool,
  style: PropTypes.object, //eslint-disable-line
  openDialog: PropTypes.bool,
}

Button.contextTypes = {
  toggleDialog: PropTypes.func,
}

export default Button
