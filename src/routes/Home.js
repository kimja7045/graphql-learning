import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/client'
import Movie from '../components/Movie'
import styled from 'styled-components'

const GET_MOVIES = gql`
    {
        movies(limit: 50, rating: 9) {
            id
            title
            medium_cover_image
            isLiked @client
        }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Header = styled.div`
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    height: 45vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const Title = styled.h1`
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
`
const SubTitle = styled.h3`
    font-size: 35px;
`
const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`
const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
    width: 60%;
    position: relative;
    top: -50px;
`

export const Home = () => {
    const { loading, error, data } = useQuery(GET_MOVIES)
    console.log(data)

    return (
        <Container>
            <Header>
                <Title>Apollo 2020</Title>
                <SubTitle>I love GraphQL</SubTitle>
            </Header>
            {loading && <Loading>Loading...</Loading>}
            <Movies>
                {data?.movies?.map((movie, i) => (
                    <Movie
                        key={i}
                        id={movie.id}
                        isLiked={movie.isLiked}
                        bg={movie.medium_cover_image}
                    />
                ))}
            </Movies>
        </Container>
    )
}
