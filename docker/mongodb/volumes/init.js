/*
 Navicat Premium Dump Script

 Source Server         : survey
 Source Server Type    : MongoDB
 Source Server Version : 40429 (4.4.29)
 Source Host           : localhost:27017
 Source Schema         : xiaojuSurvey

 Target Server Type    : MongoDB
 Target Server Version : 40429 (4.4.29)
 File Encoding         : 65001

 Date: 12/02/2026 04:39:21
*/

db = db.getSiblingDB('xiaojuSurvey');

// ----------------------------
// Collection structure for user
// ----------------------------
db.getCollection("user").drop();
db.createCollection("user");

// ----------------------------
// Documents of user
// ----------------------------
db.getCollection("user").insert([ {
    _id: ObjectId("698ce8676b56776999f77bda"),
    username: "admin",
    password: "ac0e7d037817094e9e0b4441f9bae3209d67b02fa484917065f71b16109a1a78",
    createdAt: ISODate("2026-02-11T20:36:55.466Z"),
    updatedAt: ISODate("2026-02-11T20:36:55.466Z")
} ]);
