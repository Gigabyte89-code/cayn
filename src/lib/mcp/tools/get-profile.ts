import { defineTool } from "@lovable.dev/mcp-js";
import { profile, services } from "../data";

export default defineTool({
  name: "get_profile",
  title: "Get Cayn's profile",
  description: "Returns Cayn's public profile, services, toolkit and contact details.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = { ...profile, services: [...services] };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { profile: data },
    };
  },
});
