async function summarize() {
  const article = document.getElementById("articleInput").value.trim();

  if (!article) {
    alert("Please paste a financial news article first.");
    return;
  }

  // Show loading, hide results
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");
  document.getElementById("summarizeBtn").disabled = true;

  try {
    const response = await fetch("http://localhost:5000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ article: article })
    });

    if (!response.ok) {
      throw new Error("Server error. Please try again.");
    }

    const data = await response.json();

    // Populate results
    document.getElementById("extractiveOutput").innerText = data.extractive_summary;
    document.getElementById("abstractiveOutput").innerText = data.abstractive_summary;
    document.getElementById("rougeOutput").innerText =
      `ROUGE-1 : ${data.rouge_scores.rouge1}\n` +
      `ROUGE-2 : ${data.rouge_scores.rouge2}\n` +
      `ROUGE-L : ${data.rouge_scores.rougeL}`;

    // Show results, hide loading
    document.getElementById("results").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("summarizeBtn").disabled = false;

  } catch (error) {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("summarizeBtn").disabled = false;
    alert("Error: " + error.message);
  }
}
