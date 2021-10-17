const express = require("express");
const { SuratIzin } = require("../app/controllers");
// console.log(Alternatif);
const router = express.Router();
router.post("/", SuratIzin.InsertData);
router.get("/", SuratIzin.SelectData);
router.get("/:nik", SuratIzin.SelectData);
router.put("/:nik", SuratIzin.UpdateData);
router.delete("/:nik", SuratIzin.DeleteData);

module.exports = router;
