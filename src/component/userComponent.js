import React, { Component } from "react";
import UserDataService from "../service/user.service";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class User extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                name: "",
                nickName: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    name: name
                }
            };
        });
    }

    onChangeNickname(e) {
        const nickName = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                nickName: nickName
            }
        }));
    }

    getUser(id) {
        UserDataService.get(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updatePublished(status) {
        var data = {
            id: this.state.currentUser._id,
            name: this.state.currentUser.name,
            nickName: this.state.currentUser.nickName,
            published: status
        };

        UserDataService.update(this.state.currentUser._id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentUser: {
                        ...prevState.currentUser,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(this.state.currentUser)
            });
    }


    updateUser() {
        UserDataService.update(
            this.state.currentUser._id,
            this.state.currentUser
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The user has updated successfully!"
                });
            })
            .catch(e => {
                // console.log(e);
                console.log(this.state.currentUser)
            });
        // console.log(this.state)
    }

    deleteUser() {
        UserDataService.delete(this.state.currentUser._id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/users')
            })
            .catch(e => {
                console.log(this.state.currentUser)
            });
    }

    render() {
        const { currentUser } = this.state;
        const { classes } = this.props

        return (
            <div>
                {currentUser ? (
                    <div className={classes.form}>
                        <h2>Edit Users</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Name"
                                    name="name"
                                    value={currentUser.name}
                                    onChange={this.onChangeName}
                                    required
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="Nickname"
                                    name="nickName"
                                    value={currentUser.nickName}
                                    onChange={this.onChangeNickname}
                                    required
                                />
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            <Button
                                className={`${classes.delete} ${classes.button}`}
                                onClick={this.deleteUser}>
                                Delete
                            </Button>

                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateUser}>
                                Update
                            </Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Users...</p>
                        </div>
                    )}
            </div>
        );
    }
}

export default withStyles(styles)(User)