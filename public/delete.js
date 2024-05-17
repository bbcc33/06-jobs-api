import { message, token } from "./index.js";
import { showJobs } from "./jobs.js"; // refreshes the list after deletion


export const deleteAPI = () => {
  const jobsTable = document.getElementById("jobs-table");

  if (!jobsTable) {
    console.error("jobsTable not found");
    return;
  }

  jobsTable.addEventListener("click", async (e) => {
    if (e.target.nodeName === "BUTTON" && e.target.classList.contains("deleteButton")) {
    const jobId = e.target.dataset.id;
    if (!jobId) {
        console.errro("Job ID not found on the delete button");
        return;
    }

    // const method = "DELETE"
    const url = `/api/v1/jobs/${jobId}`;
            
    try {
        const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
        });
            
        const data = await response.json();
        // if (response.status === 200 || response.status === 201) {
        //     if (response.status === 200) {
        //     // a 200 is expected for a successful update
        //     message.textContent = "The job entry was deleted.";
        //     } else {
        //     // a 201 is expected for a successful create
        //         message.textContent = "The job entry was deleted.";
        //     }
        // } else {
        //     message.textContent = data.msg || "Failed to delete the job entry."
        // }
        if (response.status === 200) {
            // Remove the deleted job entry from the UI
            const deletedJobElement = document.querySelector(`[data-id="${jobId}"]`);
            if (deletedJobElement) {
                deletedJobElement.remove();
            }
            //trying to clear the fields after they are deleted but no luck right now
            document.getElementById("company").value = "";
            document.getElementById("position").value = "";
            document.getElementById("status").value = "";
            message.textContent = "The job entry was deleted.";
        } else {
            message.textContent = data.msg || "Failed to delete the job entry.";
        }
    } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
        }
    }
});
}
