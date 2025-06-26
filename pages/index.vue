<script setup lang="ts">
const tenantName = ref('');

const goToTenant = async () => {
  if (tenantName.value) {
    const currentHost = window.location.host;
    const protocol = window.location.protocol;
    const url = `${protocol}//${tenantName.value}.${currentHost}`;

    await navigateTo(url, { external: true });
  }
};
</script>

<template>
  <div>
    <h1>Multi-Tenant App</h1>
    <form @submit.prevent="goToTenant">
      <input v-model="tenantName" name="tenant" placeholder="your-subdomain" required />
      <button type="submit">Go to Tenant</button>
    </form>
  </div>
</template>
