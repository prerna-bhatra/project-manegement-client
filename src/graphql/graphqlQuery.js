import { gql } from "@apollo/client";

const GET_ALL_PROJECTS = gql`
  query getAllProjects {
    getAllProjects {
      id
      name
      users {
        id
        name
        email
      }
      lead {
        id
        name
        email
      }
      tasks {
        id
        name
        assignee {
          id
          email
          name
        }
        assigneedBy {
          id
          name
          email
        }
      }
    }
  }
`;

const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: String) {
    getProjectById(id: $id) {
      id
      name
      tasks {
        id
        name
        status
        category
        description
        start
        end
        assignee {
          id
          name
          email
        }
        assigneedBy {
          id
          name
          email
        }
      }
    }
  }
`;

const GET_TASK_BY_ID = gql`
  query GetTaskById($id: String!) {
    getTaskById(id: $id) {
      id
      name
      status
      category
      description
      start
      end
      assignee {
        id
        name
        email
      }
      assigneedBy {
        id
        name
        email
      }
    }
  }
`;

const ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
    }
  }
`;

const LOGIN_USER = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      data {
        id
        name
        email
      }
      token
    }
  }
`;
//add project mutation
//users will be an arrray of ids of existing users
//lead will be id of any exisiting user

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $lead: String!
    $category: String!
    $start: String
    $end: String
    $users: [String]
  ) {
    addProject(
      name: $name
      lead: $lead
      category: $category
      start: $start
      end: $end
      users: $users
    ) {
      id
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask(
    $name: String!
    $assignee: String!
    $assigneedBy: String!
    $project: String!
    $category: String!
    $description: String!
  ) {
    addTask(
      name: $name
      assignee: $assignee
      assigneedBy: $assigneedBy
      project: $project
      category: $category
      description: $description
    ) {
      id
    }
  }
`;

const IS_LOGGED_IN_QUERY = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

// id: String!
// name: String!
// email: String!

export {
  GET_ALL_PROJECTS,
  GET_PROJECT_BY_ID,
  GET_TASK_BY_ID,
  LOGIN_USER,
  typeDefs,
  IS_LOGGED_IN_QUERY,
  ADD_PROJECT,
  ALL_USERS,
  ADD_TASK
};
