const { v4: uuidv4 } = require('uuid');

const create_room = (req, res) => {
    try {
        console.log(users, counter);
        const roomId = uuidv4();
        console.log('Room Id: ', roomId);
        res.render('createRoom', { roomId: roomId });
    }
    catch(err) {
        console.log('Error', err);
        res.send(err);
    }
}

module.exports = {create_room};