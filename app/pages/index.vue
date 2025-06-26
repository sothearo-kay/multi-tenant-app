<script setup lang="ts">
useSeoMeta({
  title: 'Multi-Tenant',
  description: 'Access your tenant dashboard by entering your subdomain',
});

const tenantName = ref('');

async function goToTenant() {
  if (tenantName.value) {
    const { protocol, host } = window.location;
    const url = `${protocol}//${tenantName.value}.${host}`;

    await navigateTo(url, { external: true });
  }
}
</script>

<template>
  <div>
    <h1>Multi-Tenant App</h1>
    <form @submit.prevent="goToTenant">
      <input v-model="tenantName" name="tenant" placeholder="your-subdomain" required>
      <button type="submit">
        Go to Tenant
      </button>
    </form>
  </div>
</template>
