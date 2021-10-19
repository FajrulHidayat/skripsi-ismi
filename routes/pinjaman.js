const express = require("express");
const { Pinjaman } = require("../app/controllers");
// console.log(Alternatif);
const router = express.Router();
router.post("/", Pinjaman.InsertData);
router.get("/", Pinjaman.SelectData);
router.get("/entri", Pinjaman.SelectDataEntri);
router.get("/:nik", Pinjaman.SelectData);
router.put("/:nik", Pinjaman.UpdateData);
router.delete("/:nik", Pinjaman.DeleteData);

module.exports = router;
