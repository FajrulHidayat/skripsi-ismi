const express = require("express");
const { Kriteria } = require("../app/controllers");
// console.log(Alternatif);
const router = express.Router();
router.post("/", Kriteria.InsertData);
router.get("/", Kriteria.SelectData);
router.get("/:kode_kriteria", Kriteria.SelectData);
router.put("/:kode_kriteria", Kriteria.UpdateData);
router.delete("/:kode_kriteria", Kriteria.DeleteData);

module.exports = router;
