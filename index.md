---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults
title: introduction
layout: default
---
<div class="Introductions Introductions__container pt2">

  <ul class="list-reset">
    {%- for intro in site.data.introductions -%}
      <li class="Introductions__introduction clearfix founders-grotesk color-gray pb3">
        <div class="col col-3">
          <p class="font-size-xs uppercase color-gray">
            {{ intro.title }}
          </p>
        </div>
        <div class="col col-9">
          {%- for block in intro.blocks -%}
              {% include blocks/block_switch.html type=block.type block=block %}
          {%- endfor -%}
        </div>
      </li>
    {%- endfor -%}
  </ul>

</div>
