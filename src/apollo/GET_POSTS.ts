import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query GetPosts($input: PostGetDto!) {
        posts(getPostInput: $input) {
            _id
            title
            body
            caption
            image
            postCategory
            authorName
            createdAt
        }
    }
`;
