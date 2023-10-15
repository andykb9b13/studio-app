const { Schema, model } = require("mongoose");

const pieceSchema = new Schema({
  pieceName: {
    type: String,
    required: true,
  },
  composer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pieceType: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  url: {
    type: String,
  }
});

const Piece = model("Piece", pieceSchema);

module.exports = Piece;
