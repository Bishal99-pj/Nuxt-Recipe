import type { Recipe } from "~/types/recipes.type";

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig();
    const { recipes } = await $fetch<{ recipes: Recipe[] }>(config.baseApiUrl, {
      query: {
        limitLicense: true,
        number: 100,
        apiKey: config.recipeApiKey,
      },
    });

    return recipes;
  },
  {
    base: "recipes",
    getKey: () => "recipes",
    shouldBypassCache: () => false,
    maxAge: 1000 * 60 * 60 * 24,
    staleMaxAge: 1000 * 60 * 60 * 24 * 7,
  }
);
