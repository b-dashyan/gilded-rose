import { Item } from "./Item";

export interface IUpdateService {
  updateItems(items: Array<Item>): void;
}

export class UpdateService implements IUpdateService {
  private readonly AGED_BRIE = "Aged Brie";
  private readonly SULFURAS = "Sulfuras, Hand of Ragnaros";
  private readonly BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";

  private isAgedBrie({ name }: Item): boolean {
    return name.includes(this.AGED_BRIE);
  }

  private isBackstagePass({ name }: Item): boolean {
    return name.includes(this.BACKSTAGE_PASS);
  }

  private isSulfuras({ name }: Item): boolean {
    return name.includes(this.SULFURAS);
  }

  private updateItemSellIn(item: Item): void {
    item.sellIn = item.sellIn - 1;
  }

  private updateItem(item: Item): void {
    if (!this.isSulfuras(item)) {
      this.updateItemSellIn(item);

      if (this.isAgedBrie(item)) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
        if (item.sellIn < 0) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      } else if (this.isBackstagePass(item)) {
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

        if (item.sellIn < 0) {
          item.quality = item.quality - item.quality;
        }
      } else {
        // Regular items
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
        if (item.sellIn < 0) {
          if (item.quality > 0) {
            item.quality = item.quality - 1;
          }
        }
      }
    }
  }

  updateItems(items: Array<Item>): void {
    for (const item of items) {
      this.updateItem(item);
    }
  }
}
