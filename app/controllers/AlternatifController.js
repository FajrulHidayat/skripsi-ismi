const { tb_alternatif } = require("../models");
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// const upload = multer().single("image");
// const resize = require("../services/resize.service");

class AlternatifController {
    async SelectData(req, res) {
        req.start = Date.now();
        let status;
        let message;
        let dtDocument;
    
        //get data
        if (req.params.kode_alternatif == null) {
          dtDocument = await tb_alternatif.findAll({ order: [["kode_alternatif", "ASC"]] });
        } else {
          dtDocument = await tb_alternatif.findOne({
            where: { kode_alternatif: req.params.kode_alternatif },
            order: [["kode_alternatif", "ASC"]]
          });
        }
        if (!dtDocument) {
          status = 404;
          message = "Data Document Tidak Ditemukan";
        } else {
          status = 200;
          message = "Sukses";
        }
    
        //get diagnostic
        let time = Date.now() - req.start;
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        const data = {
          diagnostic: {
            status: status,
            message: message,
            memoryUsage: `${Math.round(used * 100) / 100} MB`,
            elapsedTime: time,
            timestamp: Date(Date.now()).toString()
          },
          result: dtDocument
        };
        return res.status(status).json(data);
      }
      async InsertData(req, res) {
      
          req.start = Date.now();
          let status;
          let message;
          let dtAlternatif;
       
          const item = {
            kode_alternatif: req.body.kode_alternatif,
            nama_alternatif: req.body.nama_alternatif,
          };
          dtAlternatif = await tb_alternatif.create(item).catch(function(error){
              console.log(error.errors[0].message);
              status = 400;
          message = error.errors[0].message;
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
          }).then(function(){
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
          });
        //   console.log("dtAlternatif");
        //   console.log(dtAlternatif);
          
        //   let time = Date.now() - req.start;
        //   const used = process.memoryUsage().heapUsed / 1024 / 1024;
        //   const data = {
        //     diagnostic: {
        //       status: status,
        //       message: message,
        //       memoryUsage: `${Math.round(used * 100) / 100} MB`,
        //       elapsedTime: time,
        //       timestamp: Date(Date.now()).toString()
        //     }
        //   };
        //   return res.status(status).json(data);
  
      }

      async UpdateData(req, res) {
          //set diagnostic
          req.start = Date.now();
          let status;
          let message;
          let dtSPengacara;
          let dtPengacara;
          let image, imageName;
    
         
    
          if (req.params.kode_alternatif == null) {
            status = 400;
            message = "ID harus tercantumkan";
          } else {
            dtSPengacara = await tb_alternatif.findOne({
              where: { kode_alternatif: req.params.kode_alternatif }
            });
            if (!dtSPengacara) {
              status = 404;
              message = "Data Member Tidak Ditemukan";
            } else {
             
                const item = {
                    kode_alternatif: req.body.kode_alternatif,
                    nama_alternatif: req.body.nama_alternatif,
                  };
              dtPengacara = await tb_alternatif.update(item, {
                where: { kode_alternatif: req.params.kode_alternatif }
              });
              status = 200;
              message = "berhasil update";
            }
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
            },
            result: image
          };
          return res.status(status).json(data);
     
      }

      async DeleteData(req, res) {
        //set diagnostic
        req.start = Date.now();
        let status;
        let message;
        let dtDocument;
    
   
    
        if (req.params.kode_alternatif == null) {
          status = 403;
          message = "ID harus tercantumkan";
          id = null;
        } else {
          dtDocument = await tb_alternatif.findOne({
            where: { kode_alternatif: req.params.kode_alternatif },
            order: [["kode_alternatif", "ASC"]]
          });
        }
        if (!dtDocument) {
          status = 404;
          message = "Data Document Tidak Ditemukan";
        } else {
          await tb_alternatif.destroy({ where: { kode_alternatif: req.params.kode_alternatif } });
         
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

const alternatif = new AlternatifController();
module.exports = alternatif;