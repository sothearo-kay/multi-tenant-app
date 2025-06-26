<script setup lang="ts">
const { tenant } = useTenant();

useSeoMeta({
  title: `${tenant} Dashboard`,
  description: `Welcome to ${tenant} tenant dashboard`,
});
</script>

<template>
  <div>
    <h1>Welcome to {{ tenant }}</h1>
    <p>Hello from your tenant dashboard!</p>
  </div>
</template>
