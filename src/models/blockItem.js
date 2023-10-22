const xCenter = window.innerWidth / 2;

export default class BlockItem {
  constructor(options) {
    this.id = options.id;
    this.parentId = options.parentId ?? null;
    this.childrensId = options.childrensId ?? [];
    this.width = 150;
    this.height = 70;
    this.x = options.x ?? xCenter - this.width / 2;
    this.y = options.y ?? 50;
    this.draggable = true;
    this.rect = options.rect;
    this.text = options.text;
    // this.fill = 'green';
    // this.title = options.title ?? null;
  }
}
