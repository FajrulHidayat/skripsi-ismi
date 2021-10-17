const express = require("express")
const cors = require("cors")

const alternatifRoutes = require("../routes/alternatif");
const kriteriaRoutes = require("../routes/kriteria");
const surveiRoutes = require("../routes/survei");
const topsisRoutes = require("../routes/topsis");
const suratRoutes = require("../routes/suratIzin");
const pinjamanRoutes = require("../routes/pinjaman");
const pegawaiRoutes = require("../routes/pegawai");
const authRoutes = require("../routes/auth");
const informasiRoutes = require("../routes/informasi");

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>
res.status(200).send({
    message : "selamat datang"
}))

app.use("/image/pegawai", express.static("public/pegawai"));
app.use("/image/pinjaman", express.static("public/pinjaman"));
app.use("/image/suratIzin", express.static("public/suratIzin"));
app.use("/alternatif", alternatifRoutes);
app.use("/kriteria", kriteriaRoutes);
app.use("/survei", surveiRoutes);
app.use("/topsis", topsisRoutes);
app.use("/suratIzin", suratRoutes);
app.use("/pinjaman", pinjamanRoutes);
app.use("/pegawai", pegawaiRoutes);
app.use("/auth", authRoutes);
app.use("/informasi", informasiRoutes);

module.exports = app