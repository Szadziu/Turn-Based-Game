<template>
  <button
    @click="(e) => $emit('click', e)"
    :disabled="disabled"
    :class="{ unavailable: disabled }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['disabled'],
};
</script>

<style lang="scss" scoped>
@mixin fancy-btn($shadow, $button, $overlay, $width, $height) {
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  user-select: none;
  background: none;
  cursor: pointer;
  width: $width;
  height: $height;
  display: inline-block;
  margin: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  transition: all 0.3s;
  background: $button;
  color: #fff;
  box-shadow: 0 6px $shadow, -1px 8px 0 black, 0 0 0 2px black,
    0px 6px 0px 2px black;
  transition: none;

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    transition: all 0.3s;
  }

  &:hover {
    box-shadow: 0 4px $shadow, 0 0 0 2px black, 0px 4px 0px 2px black;
    top: 2px;
  }

  &:active {
    box-shadow: 0 0 $shadow, 0 0 0 2px black, 0px 0px 0px 2px black;
    top: 6px;
  }

  .overlay {
    width: 95%;
    height: 87%;
    position: absolute;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0px 1px 4px $overlay;
    border-radius: 5px;
    top: 2px;
    left: 5px;

    & + .overlay {
      height: 45%;
      width: 92.5%;
      left: 7px;
      border-radius: 5px;
      top: 6px;
      background: rgba(255, 255, 255, 0.2);
      box-shadow: none;

      & + .overlay {
        width: 5px;
        height: 8px;
        background: rgba(255, 255, 255, 0.65);
        border-radius: 200px;
        right: 8px;
        left: auto;
        transform: rotate(-45deg);
      }
    }
  }
}

.skills,
.update-stats {
  @include fancy-btn(#ae6a06, #ffbd21, #fe8d0a, 80px, 50px);
  font-size: 20px;
  color: black;
  padding: 5px;
}

.close {
  @include fancy-btn(#ce361b, #640632, #daddbb, 30px, 30px);
}

.hero--viking {
  @include fancy-btn(#ae6a06, #ffbd21, #fe8d0a, 220px, 50px);
}
.hero--druid {
  @include fancy-btn(#3b290c, #3a3427, #5dc024, 220px, 50px);
}

.hero--wizard {
  @include fancy-btn(#005cc1, #50b1fe, #2082ff, 220px, 50px);
}

.hero--rogue {
  @include fancy-btn(#3cb560, #288f47, #348269, 220px, 50px);
}
.hero--knight {
  @include fancy-btn(#839187, #737774, #303836, 220px, 50px);
}
.hero--archer {
  @include fancy-btn(#832844, #a3277a, #2d185e, 220px, 50px);
}

.character--attack {
  @include fancy-btn(#ee9198, #cc4143, #823434, 240px, 30px);
}

.character--spell {
  @include fancy-btn(#3ec0ce, #2f47b3, #47cfcb, 240px, 30px);
}

.character--heal {
  @include fancy-btn(#24c866, #2a7107, #0a9f55, 240px, 30px);
}

.character--special {
  @include fancy-btn(#e79fe0, #b13cd4, #88625a, 240px, 30px);
}

.unavailable {
  filter: grayscale(1);
}
</style>
