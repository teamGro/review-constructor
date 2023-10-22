export default class ArrowItem {
  constructor(options) {
    this.id = options.id;
    this.name = options.name ?? null;
    this.from = options.from ?? null;
    this.to = options.to ?? null;
    this.points = options.points ?? [];
    this.fill = 'black';
    this.stroke = 'black';
  }

  set newPoints(points) {
    this.points = points;
  }
}
