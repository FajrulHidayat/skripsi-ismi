const express = require("express");
const { Topsis } = require("../app/controllers");
// console.log(Alternatif);
const router = express.Router();
// router.post("/", Alternatif.InsertData);
router.get("/", Topsis.Topsis);
// router.get("/", Alternatif.SelectData);
// router.get("/:kode_alternatif", Alternatif.SelectData);
// router.put("/:kode_alternatif", Alternatif.UpdateData);
// router.delete("/:kode_alternatif", Alternatif.DeleteData);

module.exports = router;
