const { tb_informasi } = require("../models");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer().single("foto");
const resize = require("../services/resize.service");

class InformasiController {
  async InsertData(req, res) {
      req.start = Date.now();
      let status;
      let message;
      let dtInformasi;
      // try {
      const item={
        title: req.body.title,
        value: req.body.value,
        tipe: req.body.tipe,
      }
      dtInformasi = await tb_informasi.create(item);

      status = 200;
      message = "berhasil upload";
      let time = Date.now() - req.start;
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      const data = {
        diagnostic: {
          status: status,
          message: message,
          memoryUsage: `${Math.round(used * 100) / 100} MB`,
          elapsedTime: time,
          timestamp: Date(Date.now()).toString()
        }
      };
      return res.status(status).json(data);
  }
  async SelectData(req, res) {
    //buat variable
    req.start = Date.now();
    let status;
    let message;
    let dtInformasi;
    //try catch untuk menangkap error
    try {
      const id = req.params.id;
      //menyeleksi id
      if (req.params?.id === "suratIzin" || req.params?.id === "pinjaman") {
        //mencari data sesuai id
        dtInformasi = await tb_informasi.findAll({
            where: {tipe:req.params.id},
            order:[["id","ASC"]]
        });
      } else if (req.params?.id) {
        //mencari data sesuai id
        dtInformasi = await tb_informasi.findAll({
            where: {id:req.params.id},
            order:[["id","ASC"]]
        });
      } else{
        //mencari emua data
        dtInformasi = await tb_informasi.findAll({order:[["id","ASC"]]});
      }
      //menyeleksi data ada atau tidak
      if (dtInformasi) {
        status = 200;
        message = "Data ditemukan";
      } else {
        status = 404;
        message = "Data Tidak ditemukan";
      }
    } catch (err) {
      console.log("error : ", err);
      status = 404;
      message = `Terjadi Kesalahan (error) : ${err}`;
    }
    //membuat diagnostic
    let time = Date.now() - req.start;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    //membuat data sebagai respon
    const data = {
      diagnostic: {
        memoryUsage: `${Math.round(used * 100) / 100} MB`,
        elapsedTime: time,
        timestamp: Date(Date.now()).toString(),
        message: message,
      },
      result: dtInformasi,
    };
    //mengirim respon
    res.status(status).json(data);
  }
  async UpdateData(req, res) {
        req.start = Date.now();
        let dtInformasi,dtInformasis;
        let status;
        let message;
        let imageName
        let foto
        
          if (req.params.id == null) {
            status = 400;
            message = "ID harus tercantumkan";
          } else {
            dtInformasis = await tb_informasi.findOne({
              where: { id: req.params.id }
            });
            if (!dtInformasis) {
              status = 404;
              message = "Data Member Tidak Ditemukan";
            } else {
                const item={
                    title: req.body.title,
                    value: req.body.value,
                    tipe: req.body.tipe,
                  }
              dtInformasi = await tb_informasi.update(item, {
                where: { id: req.params.id }
              });
              status = 200;
              message = "berhasil update";
            }
          }

        //membuat diagnostic
        let time = Date.now() - req.start;
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        //membuat data sebagai respon
        const data = {
        diagnostic: {
            memoryUsage: `${Math.round(used * 100) / 100} MB`,
            elapsedTime: time,
            timestamp: Date(Date.now()).toString(),
            message: message,
        },
        result: dtInformasi,
        };
        //mengirim respon
        res.status(status).json(data);
  }
  async DeleteData(req, res) {
    req.start = Date.now();
    let dtInformasi;
    let status;
    let message;

    if (req.params.id == null) {
        status = 403;
        message = "ID harus tercantumkan";
        id = null;
      } else {
        dtInformasi = await tb_informasi.findOne({
          where: { id: req.params.id },
          order: [["id", "ASC"]]
        });
      }
      if (!dtInformasi) {
        status = 404;
        message = "Data Document Tidak Ditemukan";
      } else {
        await tb_informasi.destroy({ where: { id: req.params.id } });
        
        status = 200;
        message = "Sukses";
      }
  
      let time = Date.now() - req.start;
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      const data = {
        diagnostic: {
          status: status,
          message: message,
          memoryUsage: `${Math.round(used * 100) / 100} MB`,
          elapsedTime: time,
          timestamp: Date(Date.now()).toString()
        }
      };
      return res.status(status).json(data);
  }
}
const Informasi = new InformasiController();
module.exports = Informasi;
