import { AnswerInterface } from 'interfaces/answer';
import { GuestInterface } from 'interfaces/guest';
import { HealthcareProviderInterface } from 'interfaces/healthcare-provider';
import { GetQueryInterface } from 'interfaces';

export interface Phq9QuestionInterface {
  id?: string;
  question_text: string;
  status?: string;
  guest_id: string;
  healthcare_provider_id: string;
  created_at?: any;
  updated_at?: any;
  answer?: AnswerInterface[];
  guest?: GuestInterface;
  healthcare_provider?: HealthcareProviderInterface;
  _count?: {
    answer?: number;
  };
}

export interface Phq9QuestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  question_text?: string;
  status?: string;
  guest_id?: string;
  healthcare_provider_id?: string;
}
