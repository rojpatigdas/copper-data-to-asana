# Copper Data to Asana

This project integrates Copper CRM data with Asana, automating the creation or updating of Asana tasks based on events or data from Copper CRM.

## Features
- Syncs data from Copper CRM to Asana
- Automates task creation, updates, or escalations in Asana
- Handles escalation turnaround time (TAT) logic

## Setup
1. Set your Copper API key and Asana Personal Access Token (PAT) securely (do not hardcode in scripts).
2. Configure any required project IDs or pipeline IDs in Apps Script PropertiesService or as environment variables.
3. Deploy the Apps Script and set up triggers as needed for your workflow.

## Security Notice
- Do NOT commit real API keys, tokens, or sensitive config to version control.
- All secrets should be managed securely and are excluded via `.gitignore`. 