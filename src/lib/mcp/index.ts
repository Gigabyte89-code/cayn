import { defineMcp } from "@lovable.dev/mcp-js";
import getProfile from "./tools/get-profile";
import listProjects from "./tools/list-projects";

export default defineMcp({
  name: "portfolio",
  title: "Portfolio",
  version: "0.1.0",
  instructions:
    "Public info about Cayn, a freelance web developer. Use get_profile for services and contact details, list_projects for portfolio work.",
  tools: [getProfile, listProjects],
});
