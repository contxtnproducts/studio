---
title: "A field-ops console for teams that live in the truck, not the office"
summary: "Layout-test story — a magazine-spread detail view. Copy is placeholder; swap it for the real case study."
draft: false
tag: "Ops"
active: true
order: 4
layout: "spread"
role: "Lead Product Designer"
context: "Operations console for distributed field teams"
stage: "Series A, scaling the second product"
tags: ["0→1", "Operations", "Offline-first", "Multi-role"]
blocks:
  - type: image
    src: "/shots/stories/nectar-hero.png"
    alt: "Placeholder hero — two field workers checking a device outdoors."
    variant: enclosed

  - type: heading
    text: "The setup"
  - type: paragraph
    text: "Placeholder copy. The team we were designing for spent almost none of their day at a desk. Route in the morning, sites all day, paperwork at a gas station at night. Every assumption baked into the first product — big screens, steady connectivity, one person per account — was wrong for them."
  - type: paragraph
    text: "So the second product started from the opposite constraints. Small screens held in gloves. Signal that comes and goes. Three or four people touching the same job across a week. And a back office that needs the data clean enough to bill against."
  - type: paragraph
    text: "Placeholder. This is the kind of paragraph that exists mostly to give the column layout something to chew on, so ignore the specifics. What mattered was that the console had to be legible in a hurry and forgiving of a dropped connection."

  - type: heading
    text: "What we heard on ride-alongs"
  - type: list
    items:
      - "➺ The phone is the primary device. The laptop is where mistakes get corrected later."
      - "➺ Nobody reads a screen for more than a few seconds between tasks."
      - "➺ 'Done' is a lie until someone at the office confirms it."
      - "➺ The same site gets visited by different people with different reasons."
  - type: paragraph
    text: "Placeholder. Each of those turned into a design principle, and each principle killed a feature someone on the team was attached to. That is usually how you know discovery worked."

  - type: quote
    text: "How do you build one record of the truth when the people creating it are offline, in a hurry, and half of them don't trust the last person who touched it?"

  - type: heading
    text: "The shape of the answer"
  - type: paragraph
    text: "Placeholder. We converged on a small set of primitives: a job that anyone can pick up, a timeline of who did what, and a sync model that assumes the network is a nice surprise rather than a given."
  - type: paragraph
    text: "Everything the field app writes is queued locally and reconciled when it can. Conflicts don't block — they surface as a thing the office resolves, with both versions intact. The field never sees a spinner it can't walk away from."
  - type: list
    items:
      - "➺ Jobs are shared objects, not assignments — anyone with access can advance one."
      - "➺ Every change is attributed and reversible; the timeline is the source of truth."
      - "➺ Sync is best-effort and visible: you always know what has and hasn't left the device."
      - "➺ The office view and the field view are the same data, different density."

  - type: image
    src: "/shots/stories/relion-org-model/image-70-full.png"
    alt: "Placeholder — a dashboard screenshot standing in for the real console."
    variant: full
    caption: "Placeholder caption. The office view: same records the field writes, at desk density."

  - type: heading
    text: "Where it landed"
  - type: paragraph
    text: "Placeholder. Adoption in the field was the easy metric — people used it because the old workflow was worse. The number the business cared about was how much data made it to billing without a human touching it, and that went from roughly half to the high nineties over two quarters."
  - type: paragraph
    text: "Placeholder. This section is padding so the spread has a comfortable amount of content to run into a third and fourth column. Feel free to delete all of it."

  - type: heading
    text: "A few more screens"
  - type: paragraph
    text: "Shaped by the primitives above."
  - type: image
    src: "/shots/stories/relion-org-model/image-71-full.png"
    alt: "Placeholder — settings screen."
    variant: full
  - type: image
    src: "/shots/stories/relion-org-model/image-73-full.png"
    alt: "Placeholder — permissions screen."
    variant: full
---
