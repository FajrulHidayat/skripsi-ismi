const { tb_kriteria } = require("../models");

class KriteriaController {
    async SelectData(req, res) {
        req.start = Date.now();
        let status;
        let message;
        let dtDocument;
    
        //get data
        if (req.params.kode_kriteria == null) {
          dtDocument = await tb_kriteria.findAll({ order: [["kode_kriteria", "ASC"]] });
        } else {
          dtDocument = await tb_kriteria.findOne({
            where: { kode_kriteria: req.params.kode_kriteria },
            order: [["kode_kriteria", "ASC"]]
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
            kode_kriteria: req.body.kode_kriteria,
            nama_kriteria: req.body.nama_kriteria,
            bobot: req.body.bobot,
          };
          dtAlternatif = await tb_kriteria.create(item).catch(function(error){
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
        //   status = 200;
        //   message = "berhasil upload";
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
    
         
    
          if (req.params.kode_kriteria == null) {
            status = 400;
            message = "ID harus tercantumkan";
          } else {
            dtSPengacara = await tb_kriteria.findOne({
              where: { kode_kriteria: req.params.kode_kriteria }
            });
            if (!dtSPengacara) {
              status = 404;
              message = "Data Member Tidak Ditemukan";
            } else {
             
                const item = {
                    kode_kriteria: req.body.kode_kriteria,
            nama_kriteria: req.body.nama_kriteria,
            bobot: req.body.bobot,
                  };
              dtPengacara = await tb_kriteria.update(item, {
                where: { kode_kriteria: req.params.kode_kriteria }
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
    
   
    
        if (req.params.kode_kriteria == null) {
          status = 403;
          message = "ID harus tercantumkan";
          id = null;
        } else {
          dtDocument = await tb_kriteria.findOne({
            where: { kode_kriteria: req.params.kode_kriteria },
            order: [["kode_kriteria", "ASC"]]
          });
        }
        if (!dtDocument) {
          status = 404;
          message = "Data Document Tidak Ditemukan";
        } else {
          await tb_kriteria.destroy({ where: { kode_kriteria: req.params.kode_kriteria } });
         
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

const kriteria = new KriteriaController();
module.exports = kriteria;