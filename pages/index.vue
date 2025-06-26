<template>
  <div>
    <h1>Multi-Tenant App</h1>
    <form @submit.prevent="">
      <input name="tenant" placeholder="your-subdomain" required />
      <button type="submit">Go to Tenant</button>
    </form>
  </div>
</template>
