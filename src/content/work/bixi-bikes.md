---
title: "Monitoring 10,000 bikes: from fixed map views to custom presets"
draft: false
tag: "Energy"
summary: ""
active: false
order: 2
role: "Senior Product Designer [consultant]"
context: "AI-assisted operations platform for large bike-sharing networks"
stage: "One year after initial deployment, new use cases and expansion to new networks"
tags: ["Data", "Cartography", "Operation", "V2", "Mobility", "GIS"]

blocks:
  - type: heading
    text: "1.0 Challenge"
  - type: quote
    side: left
    text: "How to adapt map views to different operational needs??"
  - type: paragraph
    text: "At the beginning of our second collaboration, LispLogics’ AI-powered platform had been in use at BIXI, North America’s second-largest bike-sharing network, for more than a year."
  - type: paragraph
    text: "The core task of rebalancing, ensuring an appropriate distribution of bikes across the city, was now largely automated. Dispatchers were adapting to a new role."
  - type: paragraph
    text: "Secondary tasks, such as collecting broken bikes or cleaning stations, still relied on legacy tools."
  - type: paragraph
    text: "Meanwhile, more users were joining the platform, and LispLogics was responding to multiple RFPs from European networks. Both required the platform to answer operational questions beyond the original design."
  - type: image
    src: "/shots/stories/bixi-data-layers/bixi-1.png"
    alt: "Global and local filters let organization managers monitor locations across sub-orgs, and third-party managers across customers."
    variant: full
  - type: heading
    text: "2.0 Limits of the original design"
  - type: paragraph
    text: "As often happens in fast-moving startups, much had changed between collaborations. The main interface now offered three fixed views, each reflecting a specific BIXI workflow:"
  - type: numbered
    items:
    - "[View 1]"
    - "[View 2]"
    - "[View 3]"
  - type: paragraph
    text: "A few visual preferences were available, but little control over which data appeared or how it was presented."
  - type: paragraph
    text: "Interviews revealed that, although these views supported the original workflows, they were difficult to adapt to new operational questions."
  - type: paragraph
    text: "With LispLogics actively responding to RFPs from European networks, the need for flexibility extended beyond BIXI."
  - type: heading
    text: "2.0 Solutions"
  - type: paragraph
    text: "Moving to configurable data layers first required a clear information architecture: which entities the data described, how they related and which layers could meaningfully be combined."
  - type: paragraph
    text: "The next step was defining the minimum configuration needed for a useful custom view. Organizations could then configure preset views for common workflows, while individual users could create their own. View configuration could also become part of onboarding, adapting the platform to each network’s operational needs."
---