import React, { Component } from "react";
import UserDataService from "../service/user.service";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            name: "",
            nickName: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeNickname(e) {
        this.setState({
            nickName: e.target.value
        });
    }

    saveUser() {
        var data = {
            name: this.state.name,
            nickName: this.state.nickName
        };

        UserDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    nickName: response.data.nickName,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newUser() {
        this.setState({
            id: null,
            name: "",
            nickName: "",

            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newUser}>
                            Add
                        </Button>
                    </div> ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="Nickname"
                                    name="nickName"
                                    value={this.state.nickName}
                                    onChange={this.onChangeNickname}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveUser}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );

    }
}

export default withStyles(styles)(AddUser)