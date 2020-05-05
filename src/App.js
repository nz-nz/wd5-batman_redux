import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import * as ActionCreators from './store/action_creatores';
import { BatmanCard } from './components/BatmanCard';
import Err from "./components/Err";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moviesList: [], // список комиксов
            watched: [], // список смотрел / не смотрел
            errState: null, // состояние запроса - есть ошибка / всё ок
        }
    }

    componentDidMount() {

        const movies = fetch('http://api.tvmaze.com/search/shows?q=batman');

        movies
            .then((data) => {
                return data.json()
            })
            .then((data) => {

                console.log(data);
                console.log(data.map(item=>item.show))
                this.setState({
                    moviesList: data.map(item=>item.show) || [],
                    watched: localStorage.watched ? JSON.parse(localStorage.watched) : data.map(item=>{
                        return {
                            info: {
                                id: item.show.id,
                                watched: false,
                            },
                        };
                    }) || [],
                })
            })
            .catch((e) => {
                console.log("REQUEST ERROR: ", e);
                this.setState({ errState: e });
            });

    }

    onChange = (id) => {
        console.log(id);
        const newWatchedArray = this.state.watched.map((item) => {
            if (item.info.id === id) {
                console.log('found')
                return {
                    info: {
                        id: id,
                        watched: !item.info.watched,
                    }
                };
            }
            return item
        });
        console.log(newWatchedArray);

        localStorage.setItem("watched", JSON.stringify(newWatchedArray));

        this.setState({
            watched: newWatchedArray,
        });

    }

    onViewMore = () => {
        console.log('clicked details');
    }

    render() {
        console.log('main rnd');

        if (this.state.errState !== null) {
            return <Err />
        }

        return (
            <>
                <Container>
                    <Row>
                        <Col><h1>Batman Movies</h1></Col>
                    </Row>
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        {*/}
                    {/*            JSON.stringify(this.state.moviesList)*/}
                    {/*        }*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}

                <div className="root_card">
                    {
                        this.state.moviesList.map(({
                            id,
                            image,
                            name,
                            summary,
                            premiered,
                            url,
                                             }, i) =>{
                                return (
                                        <BatmanCard
                                            key = { id }
                                            id = { id }
                                            image = { image.medium }
                                            name = { name }
                                            summary = { summary }
                                            premiered = { premiered }
                                            url = { url }
                                            onChange = { this.onChange }
                                            onViewMore = { this.onViewMore }
                                            watched = { this.state.watched[i]["info"]["watched"] }
                                        />
                                );
                            }
                        )
                    }
                </div>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        moviesList: store.app.movies || [],
        watched: store.app.watched || [],
        errState: store.app.errState || [],
    }
}

const mapDispatchToProps = (dispatcher) => {
    return {
        // updateMovies: (payload) => dispatcher(ActionCreators.updateMovies(payload)),
        getMovies: (payload) => dispatcher(ActionCreators.getMovies(payload)),
    }
};

const connected = connect(mapStateToProps, mapDispatchToProps)(App);
export default connected;