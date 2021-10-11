import React from 'react'
import { useParams } from 'react-router'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            medium_cover_image
            language
            rating
            description_full
        }
        movies(limit: 50, rating: 9) {
            id
            title
        }
    }
`

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`
const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`

const Description = styled.p`
    font-size: 28px;
`
const Poster = styled.div`
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
`

export const Detail = () => {
    const { id } = useParams()
    const { loading, data, error } = useQuery(GET_MOVIE, {
        variables: { id: Number(id) },
    })
    console.log(data, error)

    return (
        <Container>
            <Column>
                <Title>
                    {loading
                        ? 'Loading...'
                        : // : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😞"}`}
                          `${data.movie.title}`}
                </Title>
                <Subtitle>
                    {data?.movie?.language} · {data?.movie?.rating}
                </Subtitle>
                <Description>{data?.movie?.description_full}</Description>
            </Column>
            <Poster bg={data?.movie?.medium_cover_image}></Poster>
        </Container>
    )
}
