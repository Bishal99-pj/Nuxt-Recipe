import { joinURL } from "ufo";
import type { ProviderGetImage } from "@nuxt/image";

export const getImage: ProviderGetImage = (
  src,
  { modifiers = {}, baseURL = "https://spoonacular.com/cdn" } = {}
) => {
  const imgSizes = [100, 250, 500];
  const size = modifiers.width || modifiers.height || 0;

  const nextLargerImgSize =
    imgSizes.find((s) => s >= size) || imgSizes[imgSizes.length - 1];

  const prefix = `/ingredients_${nextLargerImgSize}x${nextLargerImgSize}`;

  return {
    url: joinURL(baseURL, prefix, src),
  };
};
