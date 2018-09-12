import React from 'react';
import {Row, Col, Grid, Well} from 'react-bootstrap';
import * as helpers from '../../api';
import {RingLoader} from "react-spinners";
import {css} from 'react-emotion';
import MovieCard from "../MovieCard";
import './style.css';

const TMDB_IMAGE_BASE_URL = (width = 300) => `https://image.tmdb.org/t/p/w${width}`;
export default class MovieDetail extends React.Component {
    state = {
        loading: true,
        movies: [],
        recomendations: [],
        id: null
    };
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.getMovie(id);
    }
    async componentWillReceiveProps(nextProps) {
        const id = this.state.id;
        const nextId = nextProps.match.params.id;
        if(id !== nextId) {
            await this.getMovie(nextId);
        }
    }
    async getMovie(id) {
        const movie = await helpers.getMovieDetails(id);
        const recomendations = await helpers.getMovieRecomendations(id);
        await this.setState({
            loading: false,
            movie,
            recomendations,
            id
        })
    }
    render() {
        const {loading, movie, recomendations} = this.state;

        if(!loading) {
            // console.log('movieDetail',movie);
            const imgSrc = `${TMDB_IMAGE_BASE_URL(300)}${movie.backdrop_path}`;
            const movies = helpers.updateMoviesList(recomendations.results);
            const moviesColumns =  movies ? movies.map(movie => (
                <Col key={movie.id} xs={12} sm={4} md={3} lg={3}>
                    <MovieCard movie={movie} />
                </Col>
            )) : null;
            return (
                <Grid>
                    <Row>
                       <Col xs={12} md={4} sm={6}>
                           <div className="img">
                               <img className="img-responsive" src={imgSrc} alt={movie.title} />
                           </div>

                       </Col>
                        <Col md={8} sm={6} xs={12}>
                            <h1 className="movie-title">{movie.title}</h1>
                            <h3 className="movie-releaseDate">{movie.release_date}</h3>
                            <p className="movie-overview">{movie.overview}</p>
                        </Col>
                   </Row>
                    <Well bsSize="large">Recommendations:</Well>
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