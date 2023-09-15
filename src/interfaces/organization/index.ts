import { GuestInterface } from 'interfaces/guest';
import { HealthcareProviderInterface } from 'interfaces/healthcare-provider';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  status?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  guest?: GuestInterface[];
  healthcare_provider?: HealthcareProviderInterface[];
  user?: UserInterface;
  _count?: {
    guest?: number;
    healthcare_provider?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  status?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
