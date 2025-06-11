export class Reservations {
    id: number;
    check_in: string;
    check_out: string;
    status: string;
    guest_id: number;
    room_id: number;

    constructor(id: number, check_in: string, check_out: string, status: string, guest_id: number, room_id: number) {
        this.id = id;
        this.check_in = check_in;
        this.check_out = check_out;
        this.status = status;
        this.guest_id = guest_id;
        this.room_id = room_id;
    }

}

// DTO 
export interface CreateReservationDTO {
    check_in: string;
    check_out: string;
    status: string;
    guest_id: number;
    room_id: number;
}