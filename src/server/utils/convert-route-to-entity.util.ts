const mapping: Record<string, string> = {
  answers: 'answer',
  guests: 'guest',
  'healthcare-providers': 'healthcare_provider',
  organizations: 'organization',
  'phq-9-questions': 'phq_9_question',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
