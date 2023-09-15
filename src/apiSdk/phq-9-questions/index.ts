import axios from 'axios';
import queryString from 'query-string';
import { Phq9QuestionInterface, Phq9QuestionGetQueryInterface } from 'interfaces/phq-9-question';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPhq9Questions = async (
  query?: Phq9QuestionGetQueryInterface,
): Promise<PaginatedInterface<Phq9QuestionInterface>> => {
  const response = await axios.get('/api/phq-9-questions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPhq9Question = async (phq9Question: Phq9QuestionInterface) => {
  const response = await axios.post('/api/phq-9-questions', phq9Question);
  return response.data;
};

export const updatePhq9QuestionById = async (id: string, phq9Question: Phq9QuestionInterface) => {
  const response = await axios.put(`/api/phq-9-questions/${id}`, phq9Question);
  return response.data;
};

export const getPhq9QuestionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/phq-9-questions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePhq9QuestionById = async (id: string) => {
  const response = await axios.delete(`/api/phq-9-questions/${id}`);
  return response.data;
};
