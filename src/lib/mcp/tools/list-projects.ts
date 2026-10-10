import { defineTool } from "@lovable.dev/mcp-js";
import { projects } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description: "Lists the projects featured in Cayn's portfolio with links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const list = projects.map((p) => ({ ...p }));
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
      structuredContent: { projects: list },
    };
  },
});
