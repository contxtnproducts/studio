---
title: "Making one product fit widely different organizations"
summary: "How Relion's post-seed platform modeled a recursive, permission-aware organization hierarchy to fit every customer's structure — including ones it hadn't seen yet."
draft: false
tag: "Energy"
active: true
order: 1
role: "Founder Designer [consultant]"
context: "End-to-end platform supporting EV charging infra across stakeholders"
stage: "Post-seed, just joined"
tags: ["Seed", "0→1", "Architecture", "Multi-stakeholder"]
blocks:
  - type: image
    src: "/shots/stories/relion-org-model/image-77-enclosed.png"
    alt: "A service van and charging equipment in a maintenance bay, from a Relion field visit."
    variant: enclosed

  - type: heading
    text: "1.0 Challenge"
  - type: quote
    text: "How to support different organizational structures (including ones we haven't encountered yet) without over-engineering?"
  - type: paragraph
    text: "Post-seed, turning Relion's MVP into a scalable product meant laying the foundations of its organization model: hierarchy, roles, permissions and sharing."
  - type: paragraph
    text: "Patterns emerging from sales and product discovery showed that every organization we approached was structured differently."
  - type: paragraph
    text: "Some operators outsource maintenance to multiple service providers. Others delegate issue resolution to charger manufacturers. Some service providers manage chargers on behalf of multiple customers. Cities may split operations and field work across local entities. Etc, etc."

  - type: heading
    text: "2.0 Response"
  - type: paragraph
    text: "Working closely with the CPTO and engineering team, we took a few informed bets and converged on a small set of composable primitives:"
  - type: list
    items:
      - "Organizations contain users, locations and chargers, and can be recursively nested to represent structures of any depth."
      - "A parent organization can have both sub-orgs and locations of its own."
      - "Sub-orgs inherit user roles and permissions downward, not upward."
      - "Sharing gives external organizations access to specific locations without changing the hierarchy."
  - type: paragraph
    text: "This foundation* now underpins every screen and workflow in Relion, supporting hundreds of operators, manufacturers and service providers working together to maintain large networks of chargers."

  - type: heading
    text: "3.0 A few more screens"
  - type: paragraph
    text: "Shaped by the foundations described above."
  - type: image
    src: "/shots/stories/relion-org-model/image-70-full.png"
    alt: "Screenshot of the Relion dashboard's global and local filters for monitoring network status by location."
    variant: full
    caption: "Global and local filters let operations managers monitor their network by location, across sub-orgs."
  - type: image
    src: "/shots/stories/relion-org-model/image-71-full.png"
    alt: "Screenshot of the Relion organization and group settings screens."
    variant: full
  - type: image
    src: "/shots/stories/relion-org-model/image-73-full.png"
    alt: "Screenshot of the Relion sharing and permissions configuration screen."
    variant: full
---
