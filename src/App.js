import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import PropTypes from "prop-types";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
  card: {
    width: 300,
  },
  media: {
    height: 140,
  },
  deleteButton: {
    maxWidth: 10,
  },
  list: {
    width: "100%",
    maxWidth: 360,
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    // create initial state
    this.state = {
      powers: [
        { id: 0, title: "Big Head", activated: true },
        { id: 1, title: "Invisibility", activated: false },
        { id: 2, title: "Fly", activated: false },
        { id: 3, title: "Cuteness", activated: false },
      ],
      name: "Cairron's Dog",
    };

    this.powerInput = React.createRef();
  }

  componentDidMount() {
    this.powerInput.current.focus();
  }

  toggleActivated = id => {
    const updatedPowers = this.state.powers.map(power => {
      if (power.id === id) {
        power.activated = !power.activated;
      }
      return power;
    });

    // update state
    this.setState({ powers: updatedPowers });
  };

  handleDelete = id => {
    const updatedPowers = this.state.powers.filter(power => power.id !== id);

    // update sate
    this.setState({ powers: updatedPowers });
  };

  getActivePowers = () => {
    return this.state.powers.filter(power => power.activated).length;
  };

  handleSubmit = event => {
    event.preventDefault();

    const newPower = {
      id: this.state.powers.length + 1,
      title: this.powerInput.current.value,
      activated: false,
    };

    const updatedPowers = [...this.state.powers, newPower];

    // update state
    this.setState({ powers: updatedPowers });

    // reset form
    this.powerInput.current.value = "";
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item sm={3}>
          <Card className={classes.card}>
            <Header />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {this.state.name}
              </Typography>
              <Typography variant="body1" color="textPrimary" component="h5">
                Powers:
              </Typography>

              <form onSubmit={event => this.handleSubmit(event)}>
                <input
                  fullWidth={true}
                  type="text"
                  name="powerInput"
                  ref={this.powerInput}
                  placeholder="Add a new power (Hit Enter)"
                />
              </form>
              <List className={classes.list}>
                {this.state.powers.map(power => (
                  <PowerListItem
                    key={power.id}
                    power={power}
                    toggleActivated={this.toggleActivated}
                    handleDelete={this.handleDelete}
                  />
                ))}
              </List>
              <Footer getActivePowers={this.getActivePowers} />
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

const Header = props => (
  <Fragment>
    <img src={logo} className="App-logo" alt="logo" />
  </Fragment>
);

Header.propTypes = {
  name: PropTypes.string,
};

Header.defaultProps = {
  name: "A Dog",
};

const useStyles = makeStyles(() => ({
  button: {
    padding: 0,
  },
  listItems: {
    padding: 0,
  },
}));

const PowerListItem = ({ power, toggleActivated, handleDelete }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.listItems}>
      <ListItemIcon className={power.activated ? "active" : "inactive"}>
        <Checkbox
          defaultChecked={power.activated}
          onChange={() => toggleActivated(power.id)}
        />
      </ListItemIcon>

      <ListItemText primary={power.title} />

      <IconButton
        onClick={() => handleDelete(power.id)}
        className={classes.button}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

ListItem.propTypes = {
  power: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    activated: PropTypes.bool.isRequired,
  }),
};

const Footer = props => <p>Active Powers: {props.getActivePowers()}</p>;

Footer.propTypes = {
  getActivePowers: PropTypes.func.isRequired,
};

export default withStyles(styles)(App);
