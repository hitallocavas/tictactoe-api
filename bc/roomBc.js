// This class was created to manage all rooms
module.exports = class RoomBc {
    constructor() {
        this.rooms = new Array();
    }

    // Add new room to manage
    add(room) {
        this.rooms.push(room);
    }

    // Get room by id
    getById(id) {
        return this.rooms.find(room => room.id === id);
    }

    // Get list of rooms
    getRooms() {
        return this.rooms;
    }

    // Remove Room of list
    removeRoom(id) {
        let roomIndex = this.rooms.findIndex(room => room.id === id);
        this.rooms.splice(roomIndex, 1);
    }

    // Get game from context of Room
    getBoard(id) {
        var room = this.getById(id);
        return room.board;
    }


}