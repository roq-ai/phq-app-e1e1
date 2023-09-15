import { Phq9QuestionInterface } from 'interfaces/phq-9-question';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface HealthcareProviderInterface {
  id?: string;
  specialization?: string;
  experience_years?: number;
  user_id: string;
  organization_id: string;
  license_number?: string;
  status?: string;
  created_at?: any;
  updated_at?: any;
  phq_9_question?: Phq9QuestionInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    phq_9_question?: number;
  };
}

export interface HealthcareProviderGetQueryInterface extends GetQueryInterface {
  id?: string;
  specialization?: string;
  user_id?: string;
  organization_id?: string;
  license_number?: string;
  status?: string;
}
