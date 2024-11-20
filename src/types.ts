export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  generatedBy: string;
  affiliateId: string;
  createdAt: Date;
  status: LeadStatus;
  source: LeadSource;
}

export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  CONVERTED = 'Converted',
  LOST = 'Lost'
}

export enum LeadSource {
  WEBSITE = 'Website',
  REFERRAL = 'Referral',
  SOCIAL_MEDIA = 'Social Media',
  OTHER = 'Other'
}

export interface Affiliate {
  id: string;
  name: string;
  affiliateId: string;
  totalLeads: number;
  conversionRate: number;
}