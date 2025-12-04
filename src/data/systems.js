export const ALL_SYSTEMS = [
    // Core
    { id: 'workday', name: 'Workday', iconSlug: 'workday', color: '#005C9C', category: 'Core', r: 40, details: { type: 'HRIS', status: 'Healthy', sync: 'Real-time', fields: ['Employee ID', 'Job Profile'] } },
    { id: 'okta', name: 'Okta', iconSlug: 'okta', color: '#00297a', category: 'Core', r: 28, details: { type: 'Identity', status: 'Healthy', sync: 'SCIM', fields: ['SSO Profile', 'Groups'] } },
    { id: 'slack', name: 'Slack', iconSlug: 'slack', color: '#E01E5A', category: 'Core', r: 35, details: { type: 'Collaboration', status: 'Healthy', sync: 'Event-based', fields: ['User Email', 'Channel ID'] } },

    // Data
    { id: 'snowflake', name: 'Snowflake', iconSlug: 'snowflake', color: '#29B5E8', category: 'Data', r: 42, details: { type: 'Data Warehouse', status: 'Healthy', sync: 'Batch', fields: ['ALL_TABLES'] } },
    { id: 'aws', name: 'AWS', iconSlug: 'amazonaws', color: '#FF9900', category: 'Data', r: 45, details: { type: 'Infrastructure', status: 'Healthy', sync: 'Continuous', fields: ['S3 Logs', 'EC2'] } },
    { id: 'gcp', name: 'Google Cloud', iconSlug: 'googlecloud', color: '#4285F4', category: 'Data', r: 40, details: { type: 'Analytics', status: 'Healthy', sync: 'Continuous', fields: ['BigQuery'] } },

    // Finance
    { id: 'netsuite', name: 'NetSuite', iconSlug: 'oracle', color: '#C74634', category: 'Finance', r: 35, details: { type: 'ERP', status: 'Healthy', sync: 'Batch', fields: ['GL', 'Invoice'] } },
    { id: 'stripe', name: 'Stripe', iconSlug: 'stripe', color: '#635BFF', category: 'Finance', r: 30, details: { type: 'Payments', status: 'Healthy', sync: 'Real-time', fields: ['Charge ID'] } },
    { id: 'expensify', name: 'Expensify', iconSlug: 'expensify', color: '#000000', category: 'Finance', r: 25, details: { type: 'Expense', status: 'Healthy', sync: 'Weekly', fields: ['Report ID'] } },
    { id: 'carta', name: 'Carta', iconSlug: 'carta', color: '#22c55e', category: 'Finance', r: 25, details: { type: 'Equity', status: 'Healthy', sync: 'Monthly', fields: ['Grant Date'] } },
    { id: 'shopify', name: 'Shopify', iconSlug: 'shopify', color: '#96BF48', category: 'Finance', r: 30, details: { type: 'Commerce', status: 'Healthy', sync: 'Real-time', fields: ['Order ID'] } },

    // Growth
    { id: 'salesforce', name: 'Salesforce', iconSlug: 'salesforce', color: '#00A1E0', category: 'Growth', r: 35, details: { type: 'CRM', status: 'Healthy', sync: 'Real-time', fields: ['Opportunity', 'Account'] } },
    { id: 'hubspot', name: 'HubSpot', iconSlug: 'hubspot', color: '#FF7A59', category: 'Growth', r: 30, details: { type: 'Marketing', status: 'Healthy', sync: 'Bi-directional', fields: ['Lead Score'] } },
    { id: 'marketo', name: 'Marketo', iconSlug: 'adobe', color: '#5c368d', category: 'Growth', r: 28, details: { type: 'Marketing', status: 'Degraded', sync: 'Batch', fields: ['Campaign'] } },
    { id: 'google_ads', name: 'Google Ads', iconSlug: 'googleads', color: '#fbbc04', category: 'Growth', r: 25, details: { type: 'Ad Tech', status: 'Healthy', sync: 'Daily', fields: ['CPC'] } },
    { id: 'linkedin', name: 'LinkedIn', iconSlug: 'linkedin', color: '#0a66c2', category: 'Growth', r: 25, details: { type: 'Social', status: 'Healthy', sync: 'Daily', fields: ['Audience'] } },

    // Engineering
    { id: 'github', name: 'GitHub', iconSlug: 'github', color: '#ffffff', category: 'Engineering', r: 28, details: { type: 'VCS', status: 'Healthy', sync: 'Webhooks', fields: ['PR', 'Commit'] } },
    { id: 'jira', name: 'Jira', iconSlug: 'jira', color: '#0052cc', category: 'Engineering', r: 28, details: { type: 'Project Mgmt', status: 'Healthy', sync: 'Bi-directional', fields: ['Issue'] } },
    { id: 'sentry', name: 'Sentry', iconSlug: 'sentry', color: '#362d59', category: 'Engineering', r: 25, details: { type: 'Observability', status: 'Healthy', sync: 'Real-time', fields: ['Error'] } },
    { id: 'datadog', name: 'Datadog', iconSlug: 'datadog', color: '#632ca6', category: 'Engineering', r: 25, details: { type: 'Monitoring', status: 'Healthy', sync: 'Real-time', fields: ['Metric'] } },
    { id: 'pagerduty', name: 'PagerDuty', iconSlug: 'pagerduty', color: '#04a14a', category: 'Engineering', r: 25, details: { type: 'Incident Response', status: 'Healthy', sync: 'Event-driven', fields: ['Incident'] } },

    // Benefits 
    { id: 'fidelity', name: 'Fidelity', iconSlug: 'bankofamerica', color: '#198754', category: 'Benefits', r: 25, details: { type: '401k', status: 'Healthy', sync: 'Weekly', fields: ['Contribution'] } },
    { id: 'bluecross', name: 'BlueCross', iconSlug: 'jguar', color: '#0d6efd', category: 'Benefits', r: 25, details: { type: 'Insurance', status: 'Healthy', sync: 'Monthly', fields: ['Member'] } },
    { id: 'vsp', name: 'VSP Vision', iconSlug: 'eyeem', color: '#6f42c1', category: 'Benefits', r: 25, details: { type: 'Insurance', status: 'Healthy', sync: 'Monthly', fields: ['Enrollment'] } },
    { id: 'delta', name: 'Delta Dental', iconSlug: 'tooth', color: '#20c997', category: 'Benefits', r: 25, details: { type: 'Insurance', status: 'Healthy', sync: 'Monthly', fields: ['Coverage'] } },
    { id: 'guideline', name: 'Guideline', iconSlug: 'wise', color: '#0dcaf0', category: 'Benefits', r: 25, details: { type: '401k', status: 'Syncing', sync: 'Daily', fields: ['Deferral'] } },
];

export const INTEGRATIONS = [
    { id: 101, source: 'workday', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 102, source: 'workday', target: 'snowflake', direction: 'unidirectional', status: 'active' },
    { id: 103, source: 'aws', target: 'snowflake', direction: 'unidirectional', status: 'active' },
    { id: 104, source: 'gcp', target: 'snowflake', direction: 'unidirectional', status: 'idle' },
    { id: 105, source: 'okta', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 106, source: 'okta', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 201, source: 'fidelity', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 202, source: 'bluecross', target: 'workday', direction: 'unidirectional', status: 'active' },
    { id: 203, source: 'vsp', target: 'workday', direction: 'unidirectional', status: 'active' },
    { id: 204, source: 'delta', target: 'workday', direction: 'unidirectional', status: 'active' },
    { id: 205, source: 'guideline', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 301, source: 'github', target: 'jira', direction: 'bidirectional', status: 'active' },
    { id: 302, source: 'datadog', target: 'pagerduty', direction: 'unidirectional', status: 'active' },
    { id: 303, source: 'sentry', target: 'jira', direction: 'unidirectional', status: 'active' },
    { id: 304, source: 'datadog', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 305, source: 'pagerduty', target: 'slack', direction: 'unidirectional', status: 'active' },
    { id: 306, source: 'okta', target: 'github', direction: 'unidirectional', status: 'active' },
    { id: 401, source: 'salesforce', target: 'hubspot', direction: 'bidirectional', status: 'syncing' },
    { id: 402, source: 'salesforce', target: 'snowflake', direction: 'unidirectional', status: 'active' },
    { id: 403, source: 'marketo', target: 'salesforce', direction: 'bidirectional', status: 'active' },
    { id: 404, source: 'google_ads', target: 'gcp', direction: 'unidirectional', status: 'active' },
    { id: 405, source: 'linkedin', target: 'salesforce', direction: 'unidirectional', status: 'active' },
    { id: 501, source: 'shopify', target: 'netsuite', direction: 'unidirectional', status: 'active' },
    { id: 502, source: 'stripe', target: 'netsuite', direction: 'unidirectional', status: 'active' },
    { id: 503, source: 'expensify', target: 'netsuite', direction: 'unidirectional', status: 'active' },
    { id: 504, source: 'carta', target: 'workday', direction: 'bidirectional', status: 'active' },
    { id: 505, source: 'netsuite', target: 'snowflake', direction: 'unidirectional', status: 'active' },
];
