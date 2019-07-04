<template>
  <section class="lesson-1">
    <h3>Lesson One</h3>
    <h4>Basic SVG Shapes</h4>
    <svg width="600" height="400">
      <rect x="300" y="100" fill="blue" width="100" height="200" />
      <circle cx="200" cy="200" r="50" fill="pink" stroke="red" stroke-width="2" />
      <line x1="100" y1="100" x2="120" y2="300" stroke="grey" stroke-width="3" />
    </svg>
    <svg width="600" height="400">
      <path d="M 150 50 L 75 200 L 225 200 C 225 200 150 150 150 50" fill="orange" />
      <circle cx="150" cy="150" r="5" fill="grey" />
      <line x1="225" x2="150" y1="200" y2="150" stroke="grey" stroke-width="2" />
    </svg>
  </section>
</template>
<script>
export default {
  name: 'LessonOne',
};
</script>
<style>
</style>
