---
title: Guidance
description: Practical guidance using styled details/summary accordions.
layout: home.html
permalink: /guidance/
---

<section class="accordion">

<details>
  <summary>
    <h2 id="step-1-find-the-rule" class="accordion-item">
      <span class="accordion-toggle">Step 1: Find the rule</span>
    </h2>
  </summary>
  <div class="accordion-panel">
{% markdown %}
### How to find the rule

- this
- that
- and this
{% endmarkdown %} 
  </div>
</details>

<details>
  <summary>
    <h2 id="step-2-rendering-images" class="accordion-item">
      <span class="accordion-toggle">Step 2: Rendering images</span>
    </h2>
  </summary>
  <div class="accordion-panel">
    {% image "img_3610.jpg", "Alt text", "w-64" %}
  </div>
</details>

<details>
  <summary>
    <h2 id="step-3-testing" class="accordion-item">
      <span class="accordion-toggle">Step 3: Testing</span>
    </h2>
  </summary>
  <div class="accordion-panel">
    ## More content

    - one
    - two
    - three
  </div>
</details>

</section>