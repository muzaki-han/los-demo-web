<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  subtitle?: string
  color?: string
  items?: Array<{
    label: string
    value: string
  }>
}>()
</script>

<template>
  <v-card class="pa-6 text-center">
    <v-avatar
      :color="color ?? 'success'"
      size="52"
      class="mb-3"
    >
      <v-icon :icon="icon" size="28" color="white" />
    </v-avatar>

    <div class="text-h6 font-weight-bold" :class="`text-${color ?? 'success'}`">
      {{ title }}
    </div>

    <div v-if="subtitle" class="text-body-2 text-grey mt-1">
      {{ subtitle }}
    </div>

    <v-row v-if="items?.length" dense class="mt-4">
      <v-col
        v-for="(item, i) in items"
        :key="i"
        cols="12"
        :md="12 / (items.length || 1)"
      >
        <div class="text-overline text-grey-darken-1">{{ item.label }}</div>
        <div class="text-h6 font-weight-bold text-primary">{{ item.value }}</div>
      </v-col>
    </v-row>
  </v-card>
</template>
