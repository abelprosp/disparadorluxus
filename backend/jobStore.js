import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, 'data');
const JOB_FILE = join(DATA_DIR, 'jobs.json');

// Garante que a pasta exista
fs.mkdirSync(DATA_DIR, { recursive: true });

function loadJobs() {
  try {
    return JSON.parse(fs.readFileSync(JOB_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveJobs(jobs) {
  fs.writeFileSync(JOB_FILE, JSON.stringify(jobs, null, 2));
}

function addJob(job) {
  const jobs = loadJobs();
  jobs.push(job);
  saveJobs(jobs);
}

function updateJob(id, updates) {
  const jobs = loadJobs();
  const idx = jobs.findIndex(j => j.id === id);
  if (idx !== -1) {
    jobs[idx] = { ...jobs[idx], ...updates };
    saveJobs(jobs);
  }
}

function getJob(id) {
  const jobs = loadJobs();
  return jobs.find(j => j.id === id);
}

export { addJob, updateJob, getJob }; 