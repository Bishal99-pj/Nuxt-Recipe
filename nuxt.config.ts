// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
  modules: ["@nuxt/ui", "@nuxt/image"],
  runtimeConfig: {
    baseApiUrl: "",
    recipeApiKey: "",
  },
  $development: {
    nitro: {
      storage: {
        recipes: {
          driver: "fs",
          base: "recipes",
        },
      },
    },
  },
  image: {
    providers: {
      recipeImgProvider: {
        name: "spoonacularImageProvider",
        provider: "~/providers/img-provider.ts",
      },
    },
  },
});
