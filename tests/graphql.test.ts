import { describe, it, expect, jest } from '@jest/globals';
import { GraphQLClient } from 'graphql-request';
import { fetchGraphQLData, fetchGraphQLMutation } from '../app/routes/graphql';

jest.mock('graphql-request', () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
}));

describe('fetchGraphQLData', () => {
  it('returns data for a successful query', async () => {
    const mockQuery = `query { posts { nodes { id title } } }`;
    const mockData = { posts: { nodes: [{ id: '1', title: 'Test Post' }] } };
    GraphQLClient.prototype.request.mockResolvedValueOnce(mockData);

    const data = await fetchGraphQLData(mockQuery);
    expect(data).toEqual(mockData);
  });

  it('throws an error when the query fails', async () => {
    const mockQuery = `query { posts { nodes { id title } } }`;
    const mockError = new Error('GraphQL error');
    GraphQLClient.prototype.request.mockRejectedValueOnce(mockError);

    await expect(fetchGraphQLData(mockQuery)).rejects.toThrow('Error fetching data');
  });
});

describe('fetchGraphQLMutation', () => {
  it('returns data for a successful mutation', async () => {
    const mockMutation = `mutation CreatePost($title: String!, $content: String!) { createPost(input: {title: $title, content: $content}) { post { id } } }`;
    const mockVariables = { title: 'New Post', content: 'Content of the new post' };
    const mockData = { createPost: { post: { id: '2' } } };
    GraphQLClient.prototype.request.mockResolvedValueOnce(mockData);

    const data = await fetchGraphQLMutation(mockMutation, mockVariables);
    expect(data).toEqual(mockData);
  });

  it('throws an error when the mutation fails', async () => {
    const mockMutation = `mutation CreatePost($title: String!, $content: String!) { createPost(input: {title: $title, content: $content}) { post { id } } }`;
    const mockVariables = { title: 'New Post', content: 'Content of the new post' };
    const mockError = new Error('GraphQL error');
    GraphQLClient.prototype.request.mockRejectedValueOnce(mockError);

    await expect(fetchGraphQLMutation(mockMutation, mockVariables)).rejects.toThrow('Error performing mutation');
  });
});
