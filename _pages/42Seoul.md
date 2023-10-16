---
title: "42Seoul"
layout: archive
permalink: /42Seoul
---

{% assign posts = site.categories.42Seoul %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}