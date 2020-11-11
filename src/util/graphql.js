import gql from 'graphql-tag';

const FETCH_POSTS_QUERY = gql`
query getPosts($page: Int!)
  {
    getPosts(page: $page){ 
      totalPages
      currentPage
      posts {
        id
        body
        createdAt
        username
        likesCount
        likes {
          username
        }
        commentsCount
        comments {
          id
          username
          createdAt
          body
        }
        userAvatarImage
      }
    }
  }
`;

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!) {
  createPost(body: $body) {
    id
    body
    createdAt
    username
    likes {
      id
      username
      createdAt
    }
    likesCount
    comments {
      id
      body
      username
      createdAt
    }
    commentsCount
  }
}
`;

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentsCount
    }
  }
`;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likesCount
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentsCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        createdAt
        body
        commentAvatarImage
      }
      userAvatarImage
    }
  }
`;

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $avatarImage: String!
        $host: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                avatarImage: $avatarImage
            },
            host: $host
        )
    }
`;

const CONFIRMATION_USER = gql`
  mutation confirmation($email: String!
  $token: String!
	) {
		confirmation(
    	email: $email
      token: $token
        )
    }
`;

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            id email username createdAt token avatarImage
        }
    }
`;

export {
  FETCH_POSTS_QUERY, 
  CREATE_POST_MUTATION, 
  DELETE_POST_MUTATION, 
  DELETE_COMMENT_MUTATION, 
  LIKE_POST_MUTATION, 
  SUBMIT_COMMENT_MUTATION, 
  FETCH_POST_QUERY,
  REGISTER_USER,
  CONFIRMATION_USER,
  LOGIN_USER
};