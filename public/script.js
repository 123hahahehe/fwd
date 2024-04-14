async function sendMessage() {
  const guildId = document.getElementById("guildId").value;
  const channelId = document.getElementById("channelId").value;
  const content = document.getElementById("content").value;

  const response = await fetch("/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guildId, channelId, content }),
  });

  const data = await response.json();

  const responseDiv = document.getElementById("response");
  responseDiv.textContent = data.message;
}
