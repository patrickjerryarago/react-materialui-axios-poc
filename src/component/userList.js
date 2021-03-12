import React, { Component } from "react";
import UserDataService from "../service/user.service";
import { Link } from "react-router-dom";

import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshUserList = this.refreshUserList.bind(this);
    this.setActiveUsers = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
        searchName: searchName
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshUserList() {
    this.retrieveUsers();
    this.setState({
        currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
      console.log(user)
    this.setState({
        currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshUserList();
      })
      .catch(e => {
        console.log(this.state.currentUser)
      });
  }

  searchName() {
    UserDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(this.state.currentUser)
      });
  }

  render() {
    const { classes } = this.props
    const { searchName, users, currentUser, currentIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid className={classes.search} item sm={12} xs={12} md={12} xl={12} lg={12}>
            <TextField
              label="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <Button
              size="small"
              variant="outlined"
              className={classes.textField}
              onClick={this.searchName}>
              Search
            </Button>
          </Grid>
          <Grid item md={4}>
            <h2>User List</h2>

            <div className="list-group">
              {users &&
                users.map((user, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveUser(user, index)}
                    divider
                    button	
                    key={index}>
                    {user.name}
                  </ListItem>
                ))}
            </div>

            <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllUsers}>
              Remove All
          </Button>
          </Grid>
          <Grid item md={8}>
            {currentUser ? (
              <div className={classes.user}>
                <h4>Displayed User</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentUser.name}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Nickname:</strong>
                  </label>{" "}
                  {currentUser.nickName}
                </div>
                <Link
                  to={"/users/" + currentUser._id}
                  className={classes.edit}>
                  Edit
              </Link>
              </div>
            ) : (
                <div>
                  <br />
                  <p className={classes.user}>Please click on a User...</p>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(UserList)