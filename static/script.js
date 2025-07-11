// 🌗 Theme switching
document.documentElement.setAttribute("data-theme", "light");

const toggleBtn = document.getElementById("themeToggle");
toggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  toggleBtn.textContent = newTheme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";
});

// 🎧 Transcribe logic
document.getElementById("audioForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("audioFile");
  const file = fileInput.files[0];
  const button = document.getElementById("processBtn");

  if (!file) return alert("Please choose an audio file.");

  button.classList.add("active");
  setTimeout(() => button.classList.remove("active"), 150);

  document.getElementById("loading").style.display = "block";

  const formData = new FormData();
  formData.append("audio", file);

  try {
    const response = await fetch("/process-audio", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    document.getElementById("transcription").textContent = result.transcription || "Error in transcription.";
    document.getElementById("summary").textContent = result.summary || "Error in summarization.";
  } catch (error) {
    document.getElementById("transcription").textContent = "Failed to connect to server.";
    document.getElementById("summary").textContent = "";
  } finally {
    document.getElementById("loading").style.display = "none";
  }
});
