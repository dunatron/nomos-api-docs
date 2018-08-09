import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Card from "material-ui/Card/Card"
import CardActions from "material-ui/Card/CardActions"
import CardContent from "material-ui/Card/CardContent"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

const NavigationPanel = ({ match, classes, title, description, link }) => {
  console.log("match ", match)
  const bull = <span className={classes.bullet}>•</span>

  console.log("")

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            {description}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Details</Button>
        </CardActions>
      </Card>
    </div>
  )
}

NavigationPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
}

export default withStyles(styles)(NavigationPanel)
