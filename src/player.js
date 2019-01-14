// Mutability

// Mutated change
let player = { score: 1, name: 'Jeff' };
player.score = 2;

// change without Mutation
let player = { score: 1, name: 'Jeff' };
let newPlayer = object.assign({}, player, { score: 2 });
