import { AnswerInterface } from 'interfaces/answer';
import { Phq9QuestionInterface } from 'interfaces/phq-9-question';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface GuestInterface {
  id?: string;
  user_id: string;
  organization_id: string;
  registration_date?: any;
  last_login?: any;
  status?: string;
  medication?: string;
  created_at?: any;
  updated_at?: any;
  answer?: AnswerInterface[];
  phq_9_question?: Phq9QuestionInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    answer?: number;
    phq_9_question?: number;
  };
}

export interface GuestGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
  status?: string;
  medication?: string;
}
