import { Item } from "@/Item";
import { GildedRose } from "@/GildedRose";

test("sellIn decreases at the end of each day", () => {
  const gildedRose = new GildedRose([new Item("test item", 10, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(9);
});

test("quality degrades at the end of each day", () => {
  const gildedRose = new GildedRose([new Item("test item", 10, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(19);
});

test("Once sellIn is less than zero, quality degrades twice as fast", () => {
  const gildedRose = new GildedRose([new Item("test item", -1, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(18);
});

test("The quality of an item remains at 0 past sellIn", () => {
  const gildedRose = new GildedRose([new Item("test item", -1, 0)]);
  const items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(-2);
  expect(items[0].quality).toBe(0);
});

test("The quality of an item is never negative", () => {
  const gildedRose = new GildedRose([new Item("test item", 10, 0)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(0);
});

test("The quality of an item is never more than 50", () => {
  const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(50);
});

test("'Aged Brie' actually increases in quality the older it gets", () => {
  const gildedRose = new GildedRose([new Item("Aged Brie", 10, 20)]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(21);
});

test("'Aged Brie' past sellIn increases quality by 2", () => {
  const gildedRose = new GildedRose([new Item("Aged Brie", -1, 45)]);
  const items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(-2);
  expect(items[0].quality).toBe(47);
});

test("'Aged Brie' past sellIn at max quality stays at 50", () => {
  const gildedRose = new GildedRose([new Item("Aged Brie", -1, 50)]);
  const items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(-2);
  expect(items[0].quality).toBe(50);
});

test("'Sulfuras' never has to be sold", () => {
  const gildedRose = new GildedRose([
    new Item("Sulfuras, Hand of Ragnaros", 10, 20),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(10);
});

test("'Sulfuras' never degrades in quality", () => {
  const gildedRose = new GildedRose([
    new Item("Sulfuras, Hand of Ragnaros", 10, 20),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(20);
});

test("'Sulfuras' quality never alters, even if it is above 50", () => {
  const gildedRose = new GildedRose([
    new Item("Sulfuras, Hand of Ragnaros", 10, 80),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(80);
});

test("'Sulfuras' past sellIn never changes quality", () => {
  const gildedRose = new GildedRose([
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].sellIn).toBe(-1);
  expect(items[0].quality).toBe(80);
});

test("'Backstage passes' increases in quality", () => {
  const gildedRose = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 20, 20),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(21);
});

test("'Backstage passes' increases in quality by 2 when there are 10 days or less left", () => {
  const gildedRose = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(22);
  expect(items[1].quality).toBe(22);
});

test("'Backstage passes' increases in quality by 3 when there are 5 days or less left", () => {
  const gildedRose = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(23);
  expect(items[1].quality).toBe(23);
});

test("'Backstage passes' quality drops to 0 after the concert", () => {
  const gildedRose = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(0);
  expect(items[1].quality).toBe(0);
});

test("'Backstage passes' quality hits max 50 when there are 10 days or less left", () => {
  const gildedRose = new GildedRose([
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48),
  ]);
  const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(50);
});
