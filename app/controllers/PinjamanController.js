const { tb_pinjaman } = require("../models");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/pinjaman"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: diskStorage }).single("file");
// const resize = require("../services/resize.service");

class PinjamanController {
  async InsertData(req, res) {
    upload(req, res, async function (err) {
      req.start = Date.now();
      let status;
      let message;
      let dtPinjaman;
      if (err instanceof multer.MulterError) {
        return res.status(200).json(err);
      } else if (err) {
        return res.status(200).json(err);
      }

      const item = {
        nik: req.body.nik,
        nama: req.body.nama,
        jenis_usaha: req.body.jenis_usaha,
        email: req.body.email,
        alamat: req.body.alamat,
        pendapatan: req.body.pendapatan,
        kekayaan: req.body.kekayaan,
        hasil: req.body.hasil,
        foto: req.file.filename,
        lulus: false,
      };
      dtPinjaman = await tb_pinjaman.create(item);

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
          timestamp: Date(Date.now()).toString(),
        },
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
    let dtPinjaman;
    //try catch untuk menangkap error
    console.log("pinjaman");
    try {
      const id = req.params.id;
      //menyeleksi id
      if (id) {
        //mencari data sesuai id
        dtPinjaman = await tb_pinjaman.findAll({
          where: { nik: req.params.nik },
          order: [["nik", "ASC"]],
        });
      } else {
        //mencari emua data
        dtPinjaman = await tb_pinjaman.findAll({ order: [["nik", "ASC"]] });
      }
      //menyeleksi data ada atau tidak
      if (dtPinjaman) {
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
      result: dtPinjaman,
    };
    //mengirim respon
    res.status(status).json(data);
  }
  async UpdateData(req, res) {
    // await upload(req, res, async function (err) {
    req.start = Date.now();
    let dtPinjaman, dtPinjamans;
    let status;
    let message;
    let imageName;
    let foto;
    // const id = req.params.id;
    // if (err instanceof multer.MulterError) {
    //     // a multer error occurred when uploading
    //     return res.status(200).json(err);
    //   } else if (err) {
    //     return res.status(200).json(err);
    //   }

    if (req.params.nik == null) {
      status = 400;
      message = "ID harus tercantumkan";
    } else {
      dtPinjamans = await tb_pinjaman.findOne({
        where: { nik: req.params.nik },
      });
      if (!dtPinjamans) {
        status = 404;
        message = "Data Member Tidak Ditemukan";
      } else {
        imageName = dtPinjamans.foto;
        console.log(imageName);
        // await fs.unlink(`./public/pinjaman/${imageName}`, function (
        //   err
        // ) {
        //   if (err) throw err;
        //   console.log("File deleted!");
        // });

        // const imagePath = path.join(
        //   __dirname,
        //   "../../public/pinjaman"
        // );
        // const fileUpload = new resize(imagePath);
        // foto = await fileUpload.save(req.file.buffer, req.file.originalname, 600, 600);
        const item = {
          nik: req.body.nik,
          nama: req.body.nama,
          jenis_usaha: req.body.jenis_usaha,
          email: req.body.email,
          alamat: req.body.alamat,
          pendapatan: req.body.pendapatan,
          kekayaan: req.body.kekayaan,
          hasil: req.body.hasil,
          lulus: req.body.lulus,
          // foto: foto,
        };
        dtPinjaman = await tb_pinjaman.update(item, {
          where: { nik: req.params.nik },
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
      result: dtPinjaman,
    };
    //mengirim respon
    res.status(status).json(data);
    // });
  }
  async DeleteData(req, res) {
    req.start = Date.now();
    let dtPinjaman;
    let status;
    let message;

    if (req.params.nik == null) {
      status = 403;
      message = "ID harus tercantumkan";
      id = null;
    } else {
      dtPinjaman = await tb_pinjaman.findOne({
        where: { nik: req.params.nik },
        order: [["id", "ASC"]],
      });
    }
    if (!dtPinjaman) {
      status = 404;
      message = "Data Document Tidak Ditemukan";
    } else {
      await tb_pinjaman.destroy({ where: { nik: req.params.nik } });
      await fs.unlink(`./public/pinjaman/${dtPinjaman.foto}`, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });
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
        timestamp: Date(Date.now()).toString(),
      },
    };
    return res.status(status).json(data);
  }
  async SelectDataEntri(req, res) {
    //buat variable
    req.start = Date.now();
    let status;
    let message;
    let dtPinjaman;
    //try catch untuk menangkap error
    console.log("entri");
    dtPinjaman = await tb_pinjaman.findAll({
      where: { lulus: true },
      order: [["nik", "ASC"]],
    });

    if (dtPinjaman) {
      status = 200;
      message = "Data ditemukan";
    } else {
      status = 404;
      message = "Data Tidak ditemukan";
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
      result: dtPinjaman,
    };
    //mengirim respon
    res.status(status).json(data);
  }
}
const pinjaman = new PinjamanController();
module.exports = pinjaman;
