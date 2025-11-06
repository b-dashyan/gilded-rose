import { Item } from "./Item";

export interface IUpdateService {
  updateItems(items: Array<Item>): void;
}

export class UpdateService implements IUpdateService {
  updateItems(items: Array<Item>): void {
    for (const item of items) {
      this.updateItem(item);
    }
  }

  private updateItem(item: Item): void {
    const isAgedBrie = item.name === "Aged Brie";
    const isBackstagePass =
      item.name === "Backstage passes to a TAFKAL80ETC concert";
    const isSulfuras = item.name === "Sulfuras, Hand of Ragnaros";

    if (isAgedBrie) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    } else if (isBackstagePass) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.sellIn < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        item.quality = item.quality - item.quality;
      }
    } else if (isSulfuras) {
      // Sulfuras remains unchanged
    } else {
      // Regular items
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      }
    }
  }
}
