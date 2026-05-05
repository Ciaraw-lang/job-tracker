console.log("SCRIPT LOADED");

// ========================
// TAB SWITCHING
// ========================
function showTab(tab) {
  document.getElementById('tracker').style.display = 'none';
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('analyzer').style.display = 'none';

  document.getElementById(tab).style.display = 'block';
}


// ========================
// BUTTON CLICK EVENTS
// ========================
document.getElementById('trackerBtn').addEventListener('click', () => showTab('tracker'));
document.getElementById('dashboardBtn').addEventListener('click', () => showTab('dashboard'));
document.getElementById('analyzerBtn').addEventListener('click', () => showTab('analyzer'));


// ========================
// ADD JOB
// ========================
document.getElementById('jobForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const company = document.getElementById('company').value;
  const role = document.getElementById('role').value;
  const status = document.getElementById('status').value;

  try {
    const res = await fetch('/add-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, role, status })
    });

    await res.json();

    // Clear inputs
    document.getElementById('company').value = '';
    document.getElementById('role').value = '';
    document.getElementById('status').value = '';

    loadJobs();

  } catch (err) {
    console.error("Error adding job:", err);
  }
});


// ========================
// LOAD JOBS
// ========================
async function loadJobs() {
  try {
    const res = await fetch('/jobs');
    const jobs = await res.json();

    const list = document.getElementById('jobList');
    list.innerHTML = '';

    jobs.forEach(job => {
      const li = document.createElement('li');
      li.textContent = `${job.company} - ${job.role} (${job.status})`;
      list.appendChild(li);
    });

  } catch (err) {
    console.error("Error loading jobs:", err);
  }
}


// ========================
// ANALYZE
// ========================
async function analyze() {
  const resume = document.getElementById('resume').value;
  const jobDesc = document.getElementById('jobDesc').value;

  if (!resume || !jobDesc) {
    alert("Please fill in both fields");
    return;
  }

  try {
    const res = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobDesc })
    });

    const data = await res.json();

    const results = document.getElementById('results');
    results.innerHTML = '';

    data.missing.forEach(word => {
      const li = document.createElement('li');
      li.textContent = word;
      results.appendChild(li);
    });

  } catch (err) {
    console.error("Error analyzing:", err);
  }
}


// ========================
// INITIAL LOAD
// ========================
loadJobs();