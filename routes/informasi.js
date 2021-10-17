const express = require("express");
const { Informasi } = require("../app/controllers");
// console.log(Alternatif);
const router = express.Router();
router.post("/", Informasi.InsertData);
router.get("/", Informasi.SelectData);
router.get("/:id", Informasi.SelectData);
router.put("/:id", Informasi.UpdateData);
router.delete("/:id", Informasi.DeleteData);

module.exports = router;
