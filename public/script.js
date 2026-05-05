document.getElementById('jobForm').addEventListener('submit', async (e) => { 
  e.preventDefault();

  const company = document.getElementById('company').value;
  const role = document.getElementById('role').value;
  const status = document.getElementById('status').value;

  try {
	const res await fetch('add-job', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json'},
	  body: JSON.stringify({ company, role, status })
	});
	
	const data = await res.json();
	console.log(data);

	// Clear inputs after adding
	document,getElementById('company').value = '';
	document.getElementById('role').value = '';
	docuemnt.getElementById('status').value = '';

	loadJobs(); // refresh list
 
async function loadJobs() {
  try (
    const res = await fetch('/jobs');
    const jobs = await res.json();

    const list = document.getElementById('jobList');
    list.innerHTML = '';

    jobs.forEach(job => {
      const li = document.createElement('li');
      li.textContent = `$job.company} - ${job.role} (${job.status})`;
      list.appendChild(li)
 
    } catch (err) {
	console.error("Error adding job:", err);
  }
}

loadJobs();