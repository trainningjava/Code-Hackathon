window.watsonAssistantChatOptions = {
  integrationID: "3e2c3c73-d944-45bb-98c0-6595cf5cff78", // The ID of this integration.
  region: "us-south", // The region your integration is hosted in.
  serviceInstanceID: "151cff9d-f714-49fe-8b37-9345a2518b09", // The ID of your service instance.
  onLoad: function (instance) {
    instance.render();
  },
};
setTimeout(function () {
  const t = document.createElement("script");
  t.src =
    "https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
  document.head.appendChild(t);
});
