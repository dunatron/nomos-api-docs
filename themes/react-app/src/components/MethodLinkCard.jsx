import React from "react"
import { gql, compose, graphql } from "react-apollo"
import { withRouter } from "react-router"
import { propType as fragmentPropType } from "graphql-anywhere"
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

const MethodLinkCard = props => {
  console.log("match ", match)
  const {
    match,
    classes,
    method: { ID, Name, Description },
  } = props
  const bull = <span className={classes.bullet}>•</span>

  console.log("MethodLinkCard props ", props)

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {Name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            {Description}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => routeToMethod(props.history, ID)}>
            Details
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

const routeToMethod = (history, id) => {
  history.push(`/method/${id}`)
}

MethodLinkCard.fragments = {
  method: gql`
    fragment MethodOverview on Method {
      ID
      Name
      Description
    }
  `,
}

MethodLinkCard.propTypes = {
  method: fragmentPropType(MethodLinkCard.fragments.method).isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  link: PropTypes.string.isRequired,
}

// export default webkitConvertPointFromNodeToPage(MethodLinkCard)

export default compose(
  withRouter,
  withStyles(styles)
)(MethodLinkCard)
