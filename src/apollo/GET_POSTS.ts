import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query GetPosts($input: PostGetDto) {
        posts(getPostInput: $input) {
            id
            title
            body
            caption
            image
            postCategory
            authorId
            createdAt
        }
    }
`;
