import { gql } from '@apollo/client';

export const SIGNUP = gql`
    mutation Signup($input: CreateUserDto!) {
        signup(signupInput: $input) {
            id
            isAdmin
        }
    }
`;
