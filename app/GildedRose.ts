import { Item } from "./Item";
import { UpdateService } from "./UpdateService";

export class GildedRose {
  items: Array<Item>;
  private readonly updateService: UpdateService;

  constructor(
    items = [] as Array<Item>,
    updateService: UpdateService = new UpdateService()
  ) {
    this.items = items;
    this.updateService = updateService;
  }

  update() {
    this.updateService.updateItems(this.items);
    return this.items;
  }
}
