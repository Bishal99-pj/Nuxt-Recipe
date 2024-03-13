<template>
  <UContainer v-if="recipe" class="my-10">
    <h1 class="text-2xl font-bold mt-4 py-2 text-center">
      'Refresh' <Icon name="mdi:refresh" size="24" /> to see a new dish 🚀
    </h1>
    <h1 class="text-xl font-bold mt-3 py-2">{{ recipe.title }}</h1>
    <div class="flex space-x-3 items-center">
      <UBadge
        v-for="label in recipe.dishTypes"
        :key="recipe.id"
        :label="label"
        color="primary"
        variant="subtle"
        size="md"
      />
    </div>

    <section class="mt-6 space-y-5">
      <NuxtImg :src="recipe.image" :alt="recipe.title" />
      <p
        class="max-w-[75ch] leading-relaxed text-lg"
        v-html="recipe.summary"
      ></p>
    </section>

    <section class="mt-8 space-y-5">
      <h2 class="font-semibold text-xl">Ingredients</h2>
      <UTable
        :rows="recipe.extendedIngredients"
        :columns="recipeCols"
        class="gap-3"
      >
        <template> </template>
        <template #name-data="{ row }">
          <div class="flex space-x-2 items-center">
            <!-- Name of Image Provider in the Config -->
            <NuxtImg
              provider="spoonacularImageProvider"
              :src="row.image"
              :alt="`Picture of ${row.name}`"
              class="size-11 rounded-full"
            />
            <span class="flex flex-col space-y-1">
              <p>
                {{ row.name }}
              </p>
              <p>
                ({{
                  [row.measures[unit].amount, row.measures[unit].unitLong]
                    .filter(Boolean)
                    .join(" ")
                }})
              </p>
            </span>
          </div>
        </template>
        <template #unit-data="{ row }">
          {{ row.unit || "--" }}
        </template>
      </UTable>
    </section>

    <section class="mt-8 space-y-5">
      <h2 class="font-semibold text-xl">Steps</h2>
      <ol
        role="list"
        class="divide-y list-outside divide-slate-200 dark:divide-gray-700"
      >
        <li
          class="py-4 px-2 first:pt-0 last:pb-0 even:bg-gray-200/70 even:dark:bg-gray-900/30"
          v-for="{ number, step } in recipe.analyzedInstructions[0].steps"
        >
          {{ number }}. {{ step }}
        </li>
      </ol>
    </section>
    <UButton external :to="recipe.sourceUrl" variant="outline" class="mt-8">
      View original recipe on
      <span class="underline">{{ recipe.sourceName }}</span>
    </UButton>
  </UContainer>

  <UContainer v-else class="my-10">
    <h1 class="text-2xl font-bold mt-4 py-2">
      <Icon name="eos-icons:bubble-loading" size="24" /> Loading results...
    </h1>
  </UContainer>
</template>

<script lang="ts" setup>
import type { InternalApi } from "nitropack";

const { data: recipe } = await useFetch("/api/recipes", {
  transform: (data) => data[(Math.random() * data.length) | 0],
});

const columnsToShow: Array<
  keyof InternalApi["/api/recipes"]["get"][number]["extendedIngredients"][number]
> = ["aisle", "name", "original", "amount", "unit"];

const recipeCols = columnsToShow.map((c) => ({
  key: c,
  label: c.toUpperCase(),
}));

const metric = ref(true);

const unit = computed(() => (metric ? "metric" : "us"));
</script>
