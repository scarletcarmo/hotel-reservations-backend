export class Room {
  id: number;
  room_number: number;
  type: string;
  price_per_night: number;
  status: boolean;

  constructor(id: number, room_number: number, type: string, price_per_night: number, status: boolean) {
    this.id = id;
    this.room_number = room_number;
    this.type = type;
    this.price_per_night = price_per_night;
    this.status = status;
  }
}