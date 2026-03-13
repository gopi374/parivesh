export const ROLES = {
  ADMIN: 'Admin',
  PROPONENT: 'Proponent',
  SCRUTINY: 'Scrutiny',
  MOM: 'MoM Team',
};

export const WORKFLOW_STAGES = [
  'Draft',
  'Submitted',
  'Under Scrutiny',
  'Essential Document Sought',
  'Referred',
  'MoM Generated',
  'Finalized',
];

export const DUMMY_APPLICATIONS = [
  {
    id: 'EC-2026-001',
    projectTitle: 'Solar Power Plant - Site A',
    proponent: 'Green Energy Corp',
    status: 'Under Scrutiny',
    dateSubmitted: '2026-03-01',
    sector: 'Infrastructure',
  },
  {
    id: 'EC-2026-002',
    projectTitle: 'Chemical Manufacturing Unit Ext',
    proponent: 'ChemInd Ltd',
    status: 'Essential Document Sought',
    dateSubmitted: '2026-03-05',
    sector: 'Industrial',
  },
  {
    id: 'EC-2026-003',
    projectTitle: 'High-Speed Railway Project',
    proponent: 'National Rail Authority',
    status: 'Referred',
    dateSubmitted: '2026-02-20',
    sector: 'Transport',
  },
];

export const DUMMY_STATS = {
  totalApplications: 1245,
  approvedProjects: 856,
  pendingReviews: 124,
  meetingsConducted: 45,
};
