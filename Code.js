// Code.js
// Integrates Copper CRM data with Asana, automating task creation or updates based on CRM events.
// Ensure all sensitive values (API keys, tokens) are loaded securely and not hardcoded.

/**
 * Main entry point for syncing Copper data to Asana.
 * Add your trigger or event handler logic here.
 */
// function main() { ... }

const COPPER_API_KEY = 'YOUR_COPPER_API_KEY';
const COPPER_Pipeline_ID = 'YOUR_COPPER_PIPELINE_ID'; // <-- updated placeholder
const COPPER_EMAIL = 'YOUR_COPPER_EMAIL';  // <-- updated placeholder
const ASANA_PAT = 'YOUR_ASANA_ACCESS_TOKEN';
const ASANA_PROJECT_ID = 'YOUR_ASANA_PROJECT_ID';

function transferCopperOpportunitiesToAsana() {
  const opportunities = getCopperOpportunities();

  opportunities.forEach(opp => {
    const taskName = opp.name;
    const description = `Copper Opportunity ID: ${opp.id}\n\nDetails:\n${opp.details || 'No description provided.'}`;
    createAsanaTask(taskName, description);
  });
}

function getCopperOpportunities() {
  const url = 'https://api.copper.com/developer_api/v1/opportunities/search';
  const payload = {
    "page_size": 100,
    "sort_by": "updated_time",
    "pipeline_ids": [COPPER_Pipeline_ID]
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'X-PW-AccessToken': COPPER_API_KEY,
      'X-PW-Application': 'developer_api',
      'X-PW-UserEmail': COPPER_EMAIL
    },
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  return data || [];
}

function createAsanaTask(taskName, description) {
  const url = 'https://app.asana.com/api/1.0/tasks';
  const payload = {
    data: {
      name: taskName,
      notes: description,
      projects: [ASANA_PROJECT_ID]
    }
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + ASANA_PAT
    },
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}
