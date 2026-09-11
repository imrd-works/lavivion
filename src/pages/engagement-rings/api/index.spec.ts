import { describe, expect, it } from "vitest";
import type { ProductMetal } from "@/entities/product";
import {
  getBlogPreview,
  getBudgetCollections,
  getProductShelves,
  getQuickFilters,
} from "./index";

const METALS = [
  "white-gold",
  "yellow-gold",
  "rose-gold",
  "platinum",
] satisfies ProductMetal[];

const IMAGE_PATH = /^\/images\/[\w-]+\/[\w-]+\.(jpg|png)$/;

describe("page content", () => {
  it("names a metal the swatches know how to draw", async () => {
    const metals = (await getProductShelves()).flatMap((shelf) =>
      shelf.products.flatMap((product) => product.metals),
    );

    expect(metals.length).toBeGreaterThan(0);
    for (const metal of metals) expect(METALS).toContain(metal);
  });

  it("fills every shelf with the four cards the grid lays out", async () => {
    for (const shelf of await getProductShelves()) {
      expect(shelf.products).toHaveLength(4);
      expect(shelf.category.count).toBeGreaterThanOrEqual(
        shelf.products.length,
      );
    }
  });

  it("points every picture at a file that ships with the site", async () => {
    const [filters, shelves, collections, blog] = await Promise.all([
      getQuickFilters(),
      getProductShelves(),
      getBudgetCollections(),
      getBlogPreview(),
    ]);

    const images = [
      ...filters.map((filter) => filter.image),
      ...shelves.flatMap((shelf) => shelf.products.map((p) => p.image)),
      ...collections.map((collection) => collection.image),
      ...blog.items.map((article) => article.image).filter(Boolean),
    ];

    expect(images.length).toBeGreaterThan(0);
    for (const image of images) expect(image).toMatch(IMAGE_PATH);
  });

  it("marks exactly one collection as the featured one", async () => {
    const featured = (await getBudgetCollections()).filter(
      (collection) => collection.featured,
    );

    expect(featured).toHaveLength(1);
    expect(featured[0]?.title).toBeTruthy();
  });

  it("counts more articles than it shows", async () => {
    const blog = await getBlogPreview();

    expect(blog.items.length).toBeGreaterThan(0);
    expect(blog.total).toBeGreaterThan(blog.items.length);
  });
});
