---
title: "Making one product fit widely different organizations"
draft: false
tag: "Energy"
summary: ""
active: true
order: 1
role: "Founding Product Designer [consultant]"
context: "End-to-end platform supporting EV charging infrastructure across stakeholders"
stage: "Post-seed, just joined"
tags: ["Seed", "0→1", "Architecture", "Multi-stakeholder"]

blocks:
  - type: heading
    text: "1.0 Challenge"
  - type: quote
    side: left
    text: "How can we represent different customers’ organizational structures without over-engineering?"
  - type: paragraph
    text: "Post-seed, turning Relion's MVP into a scalable product meant **laying the foundations of its organization model: hierarchy, roles, permissions and sharing**. Decisions that would shape the product while we were still learning about the operational context."
  - type: paragraph
    text: "The multi-stakeholder context initially seemed fairly straightforward: charge point operators run chargers at locations and collaborate with manufacturers and service providers on issue resolution."
  - type: image
    src: "/shots/stories/relion-org-1.png"
    alt: "Screenshot of the Relion organization and group settings screens."
    variant: enclosed
    caption: "Charge point operators, manufacturers and service providers collaborating on issue resolution."
    width: 160
  - type: paragraph
    text: "But patterns emerging from sales conversations and product discovery showed that each organization we approached was structured differently."
  - type: paragraph
    text: "Many operators outsource maintenance to not one but multiple service providers. Others use warranties to delegate issue resolution to manufacturers. Some service providers become operators and manage chargers on behalf of non-technical customers. Cities or larger organizations may split operations (and thus location management) and fieldwork across local entities."
  - type: image
    src: "/shots/stories/relion-org-2.png"
    alt: "A typical North American car dealership network with chargers at every location and different operational structures in the US and Canada."
    variant: enclosed
    width: 140
    caption: "A typical North American car dealership network : Ford [Ford Canada, Ford US [Ford West Coast, Ford East Coast]]."
  - type: heading
    text: "2.0 Response"
  - type: paragraph
    text: "Working closely with the CPTO, we made a few informed bets, tested them iteratively against known customer structures and converged on a small set of guidelines balancing between structure and flexibility."
  - type: numbered
    items:
      - "Polymorphism: A shared organization entity represents CPOs, manufacturers and service providers, with room for types we haven’t yet anticipated. An organization can contain users, locations and chargers."
      - "Flexible hierarchy: Organizations can be nested to represent structures of varying depth. A parent organization can contain both sub-organizations and its own locations."
      - "Permission inheritance: User roles and permissions can be inherited down the organization hierarchy, but not upward. Access to resources such as networks and parts can follow the same logic."
      - "Collaboration through sharing: An organization can grant any other organization access to its chargers on a location-by-location basis."
      - "Incremental implementation: Implement only the parts of the model needed to onboard a customer."
  - type: heading
    text: "3.0 Beyond"
  - type: paragraph
    text: "Although refined as the product scaled, this foundation still underpins every screen and workflow in Relion, supporting hundreds of operators, manufacturers and service providers working together to maintain large networks of chargers. Product architecture shapes the entire user experience, down to the smallest interface details. Below are a few examples."
  - type: paragraph
    text: "What about AI? With today’s capabilities, we could use descriptions of customer and prospect structures to help assess our model’s fit with each new lead."
  - type: image
    src: "/shots/stories/relion-org-3.png"
    alt: ""
    variant: enclosed
    width: 140
    caption: "A more realistic picture of Relion's platform."
  - type: image
    src: "/shots/stories/relion-org-model/image-70-full.png"
    alt: "Global and local filters let organization managers monitor locations across sub-orgs, and third-party managers across customers."
    variant: full
    caption: "Global and local filters let organization managers monitor locations across sub-orgs, and third-party managers across customers."
  - type: image
    src: "/shots/stories/relion-org-model/image-71-full.png"
    alt: "Organizations can cascade access to resources like parts to sub-orgs, reducing duplication and administration."
    variant: full
    caption: "Organizations can cascade access to resources like parts to sub-orgs, reducing duplication and administration."
  - type: image
    src: "/shots/stories/relion-org-model/image-73-full.png"
    alt: "Screenshot of the Relion sharing and permissions configuration screen."
    variant: full
    caption: "Users can see a summary of activity across their organization and mute updates where needed."
---