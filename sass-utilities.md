---
title: Sass Utilities
layout: default
---
<div class="pt2">

  <ul class="list-reset">
    {%- for section in site.data.sass_utilities -%}
      <li class="clearfix founders-grotesk color-gray pb3">
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
