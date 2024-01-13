"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function randomNumber() {
  const randomNumber = Math.floor(Math.random() * 1000);
  const dateSeconds = Number(new Date());

  return dateSeconds + dateSeconds;
} exports.default = randomNumber;
