<script setup lang="ts">
import type { NuxtError } from '#app';
import { OUR_DOMAIN, PORT } from '~/constants';

defineProps<{ error: NuxtError }>();

const { isValid } = useTenant();
const isInvalidTenant = computed(() => !isValid);

async function goBackHome() {
  const { protocol } = window.location;
  const url = `${protocol}//${OUR_DOMAIN}${PORT}`;

  await navigateTo(url, { external: true });
}
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.statusMessage }}</p>

    <div v-if="isInvalidTenant">
      <p>The tenant you're looking for doesn't exist.</p>
      <button @click="goBackHome">
        Go Back Home
      </button>
    </div>

    <div v-else>
      <NuxtLink to="/">
        Go back home
      </NuxtLink>
    </div>
  </div>
</template>
