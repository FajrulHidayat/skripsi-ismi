const express = require("express");
const { Pegawai } = require("../app/controllers");
// console.log(Alternatif);
const router = express.Router();
router.post("/", Pegawai.InsertData);
router.get("/", Pegawai.SelectData);
router.get("/:nip", Pegawai.SelectData);
router.put("/:nip", Pegawai.UpdateData);
router.delete("/:nip", Pegawai.DeleteData);

module.exports = router;
