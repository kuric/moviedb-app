import React from 'react';
import {Grid, Row} from 'react-bootstrap';
import SearchBox from "../../components/SearchForm";
import MovieList from '../MovieList'

export default class MovieBrowser extends React.Component {

    render() {
        return(
            <Grid>
                <Row>
                    <SearchBox/>
                </Row>
                <Row>
                    <MovieList />
                </Row>
            </Grid>
        )
    }

}