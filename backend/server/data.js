const express = require("express");

const router = express.Router();

const herds = [
  {
    id: "herd-1",
    name: "Herd 1",
    animals: 400,
    stockClass: "Heifers",
    colour: "green",
    totalArea: 70,
    targetKgDMDay: 16
  },
  {
    id: "herd-2",
    name: "Herd 2",
    animals: 600,
    stockClass: "Mixed age",
    colour: "blue",
    totalArea: 140,
    targetKgDMDay: 18
  }
];

const information = [
    {
    id: "farm-info",
    farmName: "Rose's Farm",
    roundLengthDays: 21,
    amMilkingStart: "05:00",
    pmMilkingStart: "13:30",
    residualKgDmHa: 1550,
    targetCover: 2900,
    latitude: -43.5321,
    longitude: 172.6362,
    },
];

const paddocks = [
    { id: "p1", name: "P1", category: "Pasture", herdId: "herd-1", hectares: 8.0 },
    { id: "p2", name: "P2", category: "Pasture", herdId: "herd-1", hectares: 9.5 },
    { id: "p3", name: "P3", category: "Pasture", herdId: "herd-1", hectares: 7.5 },
    { id: "p4", name: "P4", category: "Pasture", herdId: "herd-1", hectares: 8.2 },
    { id: "p5", name: "P5", category: "Young Grass", herdId: "herd-1", hectares: 6.8 },
    { id: "p6", name: "P6", category: "Crop", herdId: "herd-2", hectares: 8.1 },
    { id: "p7", name: "P7", category: "Young Grass", herdId: "herd-2", hectares: 7.7 },
    { id: "p8", name: "P8", category: "Pasture", herdId: "herd-2", hectares: 8.4 },
    { id: "p9", name: "P9", category: "Pasture", herdId: "herd-2", hectares: 7.9 },
    { id: "p10", name: "P10", category: "Pasture", herdId: "herd-2", hectares: 8.0 },
  ]

router.get("/api/farm", (req, res) => {
  res.json({
    herds,
    information,
    paddocks,
  });
});

module.exports = router;