const express = require("express");
const { Survei } = require("../app/controllers");
// console.log(Alternatif);
const router = express.Router();
router.post("/", Survei.InsertData);
router.get("/syncron/", Survei.SyncronData);
router.get("/", Survei.SelectData);
router.get("/:kode_alternatif", Survei.SelectData);
router.put("/:kode_alternatif", Survei.UpdateData);
router.put("/", Survei.UpdateDatas);
router.delete("/:kode_alternatif", Survei.DeleteData);

module.exports = router;
