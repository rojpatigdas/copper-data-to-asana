// EscalationsTAT.js
// Handles escalation turnaround time (TAT) logic for Copper CRM and Asana integration.
// Ensure all sensitive values (API keys, tokens) are loaded securely and not hardcoded.

/**
 * Main function for processing escalations and calculating TAT.
 * Add your trigger or event handler logic here.
 */
// function main() { ... }

const ASANA_TOKEN = 'Bearer YOUR_ASANA_PAT_HERE';
const PROJECT_ID = 'YOUR_ASANA_PROJECT_ID'; // <-- updated placeholder
const DURATION_FIELD_GID = 'YOUR_ESCALATIONS_TAT_FIELD_GID_HERE'; // e.g., '12001234567890'

function calculateDurationForCompletedTasks() {
  const tasks = getTasksFromProject(PROJECT_ID);

  tasks.forEach(task => {
    if (task.completed && task.start_on && task.completed_at) {
      const existingTAT = task.custom_fields.find(f => f.gid === DURATION_FIELD_GID);

      if (!existingTAT || !existingTAT.number_value) {
        const startDate = new Date(task.start_on);
        const completedDate = new Date(task.completed_at);
        const diffDays = Math.ceil((completedDate - startDate) / (1000 * 60 * 60 * 24));

        updateCustomField(task.gid, DURATION_FIELD_GID, diffDays);
      }
    }
  });
}

function getTasksFromProject(projectId) {
  const url = `https://app.asana.com/api/1.0/projects/${projectId}/tasks?opt_fields=gid,completed,completed_at,start_on,custom_fields&limit=100`;
  const response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: ASANA_TOKEN,
    },
  });

  const json = JSON.parse(response.getContentText());
  return json.data;
}

function updateCustomField(taskGid, fieldGid, value) {
  const url = `https://app.asana.com/api/1.0/tasks/${taskGid}`;
  const payload = {
    data: {
      custom_fields: {
        [fieldGid]: value
      }
    }
  };

  const options = {
    method: 'PUT',
    contentType: 'application/json',
    headers: {
      Authorization: ASANA_TOKEN,
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}
