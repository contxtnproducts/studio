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
# Redesign scratch of relion-org-model, rebuilt bit by bit against
# Figma "Desktop - 44" (node 1679-3224) on the /stories/next/ template.
blocks:
  - type: heading
    text: "1.0 Challenge"
  - type: quote
    side: left
    text: "How to support different organizational structures (including ones we haven't encountered yet) without over-engineering?"
  - type: paragraph
    text: "Post-seed, turning Relion's MVP into a scalable product meant laying the foundations of its organization model: hierarchy, roles, permissions and sharing. Mapped from a context we had over-simplified to : charge point operators run chargers at locations. And, collaborate with manufacturers and service providers on issue resoltion"
  - type: image
    src: "/shots/stories/relion-org-1.png"
    alt: "Screenshot of the Relion organization and group settings screens."
    variant: enclosed
    width: 140
  - type: paragraph
    text: "But patterns emerging from sales and product discovery showed that every organization we approached was structured differently."
  - type: paragraph
    text: "Many operators outsource maintenance to not one but multiple service providers. Others leverage warranties to delegate issue resolution to manufacturers. Some service providers becomes operators and manage chargers on behalf of  non technical customers. Cities or larger organizations may split operations (and thus location management) and field work across local entities."

  - type: heading
    text: "2.0 Response"
  - type: paragraph
    text: "Working closely with the CPTO and engineering team, we took a few informed bets, tested against known organization and converged on a small set of composable guidelines."
  - type: image
    src: "/shots/stories/relion-org-2.png"
    alt: "Screenshot of the Relion organization and group settings screens."
    variant: enclosed
    width: 140
  - type: paragraph
    text: "A) Abstraction : everything is an organization including Service Providers and Manufacturers. Organizations contain users, locations and chargers, and can be recursively nested to represent structures of any depth."
  - type: paragraph
    text: "The exemple above represents a typical Nort-American car dealer. 1 sub-org for Canada."
  - type: list
    items:
      - "Organizations contain users, locations and chargers, and can be recursively nested to represent structures of any depth."
      - "A parent organization can have both sub-orgs and locations of its own."
      - "Sub-orgs inherit user roles and permissions downward, not upward."
      - "Sharing gives external organizations access to specific locations without changing the hierarchy."
  - type: paragraph
    text: "This foundation* now underpins every screen and workflow in Relion, supporting hundreds of operators, manufacturers and service providers working together to maintain large networks of chargers."

  - type: image
    src: "/shots/stories/relion-org-model/image-70-full.png"
    alt: "Screenshot of the Relion dashboard's global and local filters for monitoring network status by location."
    variant: full
    caption: "Global and local filters let operations managers monitor their network by location, across sub-orgs."
  - type: image
    src: "/shots/stories/relion-org-model/image-71-full.png"
    alt: "Screenshot of the Relion organization and group settings screens."
    variant: full
    caption: "Organization and group settings — the hierarchy is configured once here, then inherited everywhere."
  - type: image
    src: "/shots/stories/relion-org-model/image-73-full.png"
    alt: "Screenshot of the Relion sharing and permissions configuration screen."
    variant: full
    caption: "Sharing gives an external org access to specific locations, without changing the hierarchy."
---
