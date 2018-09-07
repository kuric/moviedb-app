import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export default class SearchBox extends React.Component {
    state = {
        value: ''
    };
    render() {
        return (
            <form>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Working example with validation</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Enter text"
                        onChange={this.handleChangeSelect}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length.</HelpBlock>
                </FormGroup>
            </form>
        )
    }
    getValidationState = () =>{
        const length = this.state.value.length;
        if (length > 50) return 'error';
        else if (length > 20) return 'warning';
        else if (length > 0) return 'success';
        return null;
    };
    handleChangeSelect = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.action(e)
    }

}