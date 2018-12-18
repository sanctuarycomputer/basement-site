---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
title: introduction
layout: default
---
<div class="Introductions Introductions__container pt2">

  <ul class="list-reset">
    {%- for section in site.data.introductions -%}
      <li class="Introductions__introduction clearfix founders-grotesk color-gray pt1 pb3" data-section id="{{ section.target_id }}">
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
