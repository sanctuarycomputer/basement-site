---
title: Class Definitions
layout: default
---
<div class="ClassDefinitions pt2">

  <ul class="list-reset">
    {%- for section in site.data.class_definitions -%}
      <li class="ClassDefinitions__section clearfix founders-grotesk color-gray pb3" data-section id="{{ section.target_id }}">
        <div class="col col-3">
          <p class="font-size-xs uppercase color-gray">
            {{ section.title }}
          </p>
        </div>
        <div class="col col-9">
          {%- for block in section.blocks -%}
              {% include blocks/block_switch.html type=block.type block=block %}
          {%- endfor -%}
        </div>
      </li>
    {%- endfor -%}
  </ul>

</div>
