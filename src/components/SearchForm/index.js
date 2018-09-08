import React from 'react';
import {FormGroup,FormControl} from 'react-bootstrap';

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
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Select movie..."
                        onChange={this.handleChangeSelect}
                    />
                    <FormControl.Feedback />
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