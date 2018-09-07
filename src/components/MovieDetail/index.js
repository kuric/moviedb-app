import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import * as helpers from '../../helpers';
import {RingLoader} from "react-spinners";
import {css} from 'react-emotion';
import MovieCard from "../MovieCard";

export default class MovieDetail extends React.Component {
    state = {
        loading: true,
        movies: [],
        recomendations: []
    };
    async componentDidMount() {
        const id = this.props.match.params.id;
        const movie = await helpers.getMovieDetails(id);
        const recomendations = await helpers.getMovieRecomendations(id);
        await this.setState({
            loading: false,
            movie,
            recomendations
        })
    }
    render() {
        const {loading, movie, recomendations} = this.state;
        if(!loading) {
            console.log(recomendations);
            const movies = helpers.updateMoviesList(recomendations.results);
            const moviesColumns =  movies ? movies.map(movie => (
                <Col key={movie.id} xs={12} sm={4} md={3} lg={3}>
                    <MovieCard movie={movie} />
                </Col>
            )) : null;
            return (
                <Grid>
                   <Row>
                        <h1>{movie.title}</h1>
                        <h3>{movie.release_date}</h3>
                       <p>{movie.overview}</p>
                   </Row>
                    <Row>
                        {moviesColumns}
                    </Row>
                </Grid>
            )
        } else {
            return (
                <Grid>
                    <Row >
                       <RingLoader
                           className={override}
                            sizeUnit={"px"}
                            size={60}
                            color={'#123abc'}
                            loading={this.state.loading}
                        />
                    </Row>
                </Grid>
            )
        }
    }
}

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;