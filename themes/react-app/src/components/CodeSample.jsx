import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
// Syntax highlighter
import SyntaxHighlighter from "react-syntax-highlighter"
import { compose } from "react-apollo/index"
import { connect } from "react-redux"

const styles = theme => ({
  codeBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "medium",
    overflowX: "scroll",
    textAlign: "left",
    maxHeight: "100%",
  },
  preStyle: {
    margin: 0,
  },
})

class CodeSample extends Component {
  render() {
    const { classes, CodeSample, fontSize, language, extraClass } = this.props

    let highlighterSettingsStyle = {
      fontSize: `${fontSize}px`,
      lineHeight: `${fontSize}px`,
    }

    return (
      <div
        className={`${classes.codeBody} ${extraClass}`}
        style={highlighterSettingsStyle}>
        <SyntaxHighlighter
          language={language ? language : "javascript"}
          className={classes.preStyle}
          style={this.props.style}
          showLineNumbers={this.props.showLineNumbers}>
          {CodeSample ? CodeSample : ""}
        </SyntaxHighlighter>
      </div>
    )
  }
}

CodeSample.propTypes = {
  classes: PropTypes.object.isRequired,
}

const reduxWrapper = connect(state => ({
  selectedStyle: state.higlightStyle.selected,
  style: state.higlightStyle.style,
  showLineNumbers: state.higlightStyle.showLineNumbers,
  fontSize: state.higlightStyle.fontSize,
}))

export default compose(
  reduxWrapper,
  withStyles(styles)
)(CodeSample)
