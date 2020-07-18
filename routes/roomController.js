var express = require('express');
var router = express.Router();
var shortId = require('shortid');

// Set characters to generate just Alphanumeric characters
shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

// Import models 
var Board = require('../models/board');
var Room = require('../models/room');

// Import Business Controllers
var RoomBc = require('../bc/roomBc');

// Attempt to Inject RoomBc to Game Controller
var roomBc = new RoomBc();

// Endpoint to create a new room
router.get('/', function(req, res) {
    let id = shortId.generate();
    let room = new Room(id, new Board());
    roomBc.add(room);
    res.send("ENVIE ESTE CÓDIGO PARA JOGAR COM OUTRA PESSOA: " + room.id);
})

// Endpoint to get room by Id
router.get('/:id', function(req, res) {
    let id = req.params.id;
    const room = roomBc.getById(id);
    res.send(room);
})

// Endpoint to play on board
router.post('/board/add/:id/:pos', function(req, res, next) {

    // Extract values from params passed in URL
    let id = req.params.id;
    let pos = req.params.pos;

    // Extract informations about room acording with params
    let room = roomBc.getById(id);
    let board = room.board;

    // Simple position validation
    if (pos < 10 && pos > 0) {
        var boardContext = board.add(pos);
        res.send(boardContext);
    } else {
        res.send('Posição enviada não é válida');
    }
});

module.exports = router;