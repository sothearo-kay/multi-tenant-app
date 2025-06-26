<script setup lang="ts">
const { tenant } = useTenant();
</script>

<template>
  <div>
    <h1>Welcome to {{ tenant }}</h1>
    <p>Hello from your tenant dashboard!</p>
  </div>
</template>
