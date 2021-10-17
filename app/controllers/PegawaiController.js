const { tb_pegawai } = require("../models");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer().single("foto");
const resize = require("../services/resize.service");

class PegawaiController {
  async InsertData(req, res) {
    upload(req, res, async function (err) {
      req.start = Date.now();
      let status;
      let message;
      let dtPegawai;
      console.log(req.file);
      if (err instanceof multer.MulterError) {
        return res.status(200).json(err);
      } else if (err) {
        return res.status(200).json(err);
      }
      // try {
    
      const imagePath = path.join(__dirname, "../../public/pegawai");
      const fileUpload = new resize(imagePath);
      let foto = await fileUpload.save(req.file.buffer, req.file.originalname);

      const item={
        nip: req.body.nip,
        nama: req.body.nama,
        jabatan: req.body.jabatan,
        deskripsi: req.body.deskripsi,
        foto: foto,
      }
      dtPegawai = await tb_pegawai.create(item);

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
      // } catch (error) {
      //   return res.status(401).json({ success: false, error: error });
      // }
    });
  }
  async SelectData(req, res) {
    //buat variable
    req.start = Date.now();
    let status;
    let message;
    let dtPegawai;
    //try catch untuk menangkap error
    try {
      const id = req.params.nip;
      //menyeleksi id
      if (id) {
        //mencari data sesuai id
        dtPegawai = await tb_pegawai.findAll({
            where: {nip:req.params.nip},
            order:[["id","ASC"]]
        });
      } else {
        //mencari emua data
        dtPegawai = await tb_pegawai.findAll({order:[["id","ASC"]]});
      }
      //menyeleksi data ada atau tidak
      if (dtPegawai) {
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
      result: dtPegawai,
    };
    //mengirim respon
    res.status(status).json(data);
  }
  async UpdateData(req, res) {
    // await upload(req, res, async function (err) {
        req.start = Date.now();
        let dtPegawai,dtPegawais;
        let status;
        let message;
        let imageName
        let foto
        // const id = req.params.id;
        // if (err instanceof multer.MulterError) {
        //     // a multer error occurred when uploading
        //     return res.status(200).json(err);
        //   } else if (err) {
        //     return res.status(200).json(err);
        //   }
        
          if (req.params.nip == null) {
            status = 400;
            message = "ID harus tercantumkan";
          } else {
            dtPegawais = await tb_pegawai.findOne({
              where: { nip: req.params.nip }
            });
            if (!dtPegawais) {
              status = 404;
              message = "Data Member Tidak Ditemukan";
            } else {
              // imageName = dtPegawais.foto;
              // console.log(imageName);
              // await fs.unlink(`./public/pegawai/${imageName}`, function (
              //   err
              // ) {
              //   if (err) throw err;
              //   console.log("File deleted!");
              // });
    
              // const imagePath = path.join(
              //   __dirname,
              //   "../../public/pegawai"
              // );
              // const fileUpload = new resize(imagePath);
              // foto = await fileUpload.save(req.file.buffer, req.file.originalname, 600, 600);
              const item={
                nip: req.body.nip,
                nama: req.body.nama,
                jabatan: req.body.jabatan,
                deskripsi: req.body.deskripsi,
                // foto: foto,
              }
              dtPegawai = await tb_pegawai.update(item, {
                where: { nip: req.params.nip }
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
        result: dtPegawai,
        };
        //mengirim respon
        res.status(status).json(data);
    // });
  }
  async DeleteData(req, res) {
    req.start = Date.now();
    let dtPegawai;
    let status;
    let message;

    if (req.params.nip == null) {
        status = 403;
        message = "ID harus tercantumkan";
        id = null;
      } else {
        dtPegawai = await tb_pegawai.findOne({
          where: { nip: req.params.nip },
          order: [["id", "ASC"]]
        });
      }
      if (!dtPegawai) {
        status = 404;
        message = "Data Document Tidak Ditemukan";
      } else {
        await tb_pegawai.destroy({ where: { nip: req.params.nip } });
        await fs.unlink(
          `./public/pegawai/${dtPegawai.foto}`,
          function (err) {
            if (err) throw err;
            console.log("File deleted!");
          }
        );
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
const Pegawai = new PegawaiController();
module.exports = Pegawai;
