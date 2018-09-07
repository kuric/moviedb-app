import React from 'react';
import {Grid, Row} from 'react-bootstrap';

import MovieList from '../MovieList'

export default class MovieBrowser extends React.Component {

    render() {
        return(
            <Grid>
                <Row>
                    <MovieList />
                </Row>
            </Grid>
        )
    }

}