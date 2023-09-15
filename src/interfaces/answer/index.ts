import { Phq9QuestionInterface } from 'interfaces/phq-9-question';
import { GuestInterface } from 'interfaces/guest';
import { GetQueryInterface } from 'interfaces';

export interface AnswerInterface {
  id?: string;
  answer_text: string;
  question_id: string;
  guest_id: string;
  date_time?: any;
  medication?: string;
  status?: string;
  created_at?: any;
  updated_at?: any;

  phq_9_question?: Phq9QuestionInterface;
  guest?: GuestInterface;
  _count?: {};
}

export interface AnswerGetQueryInterface extends GetQueryInterface {
  id?: string;
  answer_text?: string;
  question_id?: string;
  guest_id?: string;
  medication?: string;
  status?: string;
}
