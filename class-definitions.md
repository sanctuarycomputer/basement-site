---
title: Class Definitions
layout: default
---
<div class="ClassDefinitions pt2">

  <ul>
    {%- for section in site.data.class_definitions -%}
      <li class="ClassDefinitions__section clearfix founders-grotesk color-gray pt2" data-section id="{{ section.target_id }}">
        <div class="col col-12 py1 lg:col-3 lg:py0">
          <p class="font-size-xs uppercase color-gray">
            {{ section.title }}
          </p>
        </div>
        <div class="col col-12 lg:col-9">
          {%- for block in section.blocks -%}
              {% include blocks/block_switch.html type=block.type block=block %}
          {%- endfor -%}
        </div>
      </li>
    {%- endfor -%}
  </ul>

</div>
