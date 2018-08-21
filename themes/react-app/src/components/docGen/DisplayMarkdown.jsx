import React, { Component, Fragment } from "react"
import { markdown } from "markdown"
import { withStyles } from "material-ui/styles"

const styles = theme => ({})
const DisplayMarkdown = props => {
  const { classes, markdownContent } = props
  console.log("Lets look at markdown ", markdown)
  console.log(markdown.toHTML("Hello *World*!"))
  console.log("Markdown Contents ", markdownContent)
  return (
    <div>
      <div>{markdownContent}</div>
      <div>{markdown.toHTML(String(markdownContent))}</div>
      {/* <div> Mark Down Display: {markdown.toHTML("Hello *World*!")}</div> */}
      {/* <div>{markdown.parse("Hello *World*!")}</div>
      <div>
        Some options. Either use the rawest form of mardown on decorate our
        components with custom styles
      </div>
      <div>
        We will still need a markdown editor. Something lite and easy to add our
        own stuff into
      </div> */}
    </div>
  )
}

export default withStyles(styles)(DisplayMarkdown)
