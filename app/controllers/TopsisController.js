const { tb_alternatif,tb_kriteria,tb_hasil_survei } = require("../models");

class TopsisController {
    async Topsis(req, res) {
        req.start = Date.now();
        let status;
        let message;
        let dtAlternatif,dtKriteria,dtSurveis;
        let kd_alternatif=[],kd_kriteria=[],arr_survei=[],dtSurvei=[],hasil=[]
        let pembagi=[],matriksPengali=[],matriksKeputusan=[],max=[],min=[],dPlus=[],dMin=[],preferensi=[]
        
        //get data
        dtAlternatif = await tb_alternatif.findAll({ order: [["kode_alternatif", "ASC"]] });
        dtKriteria = await tb_kriteria.findAll({ order: [["kode_kriteria", "ASC"]] });
        dtSurveis = await tb_hasil_survei.findAll({ order: [["id_hasil_survei", "ASC"]] });

        dtAlternatif.forEach(data => {
            kd_alternatif.push(data.dataValues.kode_alternatif)
        });
        dtKriteria.forEach(data => {
            kd_kriteria.push(data.dataValues.kode_kriteria)
        });
        dtSurveis.forEach(data => {
            dtSurvei.push(data.dataValues)
        });
        // console.log(dtSurvei);
        
        for (let kriteria = 0; kriteria < kd_kriteria.length; kriteria++) {
            let arr_alternatif=[]
            let objs = dtSurvei.filter(o=>o.kode_kriteria===kd_kriteria[kriteria])
          for (let alternatif = 0; alternatif < kd_alternatif.length; alternatif++) {
            let obj = objs.find(o=>o.kode_alternatif===kd_alternatif[alternatif])
            // console.log(obj);
            arr_alternatif.push(obj)
          } 
          arr_survei.push({data:arr_alternatif})
        }
        hasil.push({arr_survei})
        //pembagi
        for (let index = 0; index < arr_survei.length; index++) {
            let tambah=0
            for (let i = 0; i < arr_survei[index].data.length; i++) {
                tambah+=Math.pow(arr_survei[index].data[i].bobot,2)
            }
            pembagi.push(Math.sqrt(tambah))
        }
        // console.log(pembagi);
        //2)	Membuat matriks keputusan yang ternormalisasi terbobot 
        for (let index = 0; index < arr_survei.length; index++) {
            let col=[]
            for (let i = 0; i < arr_survei[index].data.length; i++) {
                col.push(arr_survei[index].data[i].bobot/pembagi[index])
                // col+=Math.pow(arr_survei[index].data[i].bobot,2)
            }
            matriksPengali.push({row:col})
        }
        
        for (let index = 0; index < matriksPengali.length; index++) {
            let col=[]
            for (let i = 0; i < matriksPengali[index].row.length; i++) {
                col.push(matriksPengali[index].row[i]*dtKriteria[index].dataValues.bobot)
            }
            matriksKeputusan.push({row:col})
        }
        hasil.push({matriksKeputusan})
        //max min
        for (let index = 0; index < matriksKeputusan.length; index++) {
            let arr=matriksKeputusan[index].row
            let x = arr.reduce(function(a, b) {
                return Math.max(a, b);
            });
            let m = arr.reduce(function(a, b) {
                return Math.min(a, b);
            });
            max.push(x)
            min.push(m)
        }
        hasil.push({max})
        hasil.push({min})
        // console.log(matriksKeputusan);
        // console.log(max);

        //solusi ideal
        for (let index = 0; index < matriksKeputusan[0].row.length; index++) {
          let tambahPlus=0
          let tambahMin=0
          for (let i = 0; i < matriksPengali.length; i++) {
            // console.log("max[i]");
            // console.log(max[i]);
            // console.log("matriksKeputusan[i].row[index]");
            // console.log(matriksKeputusan[i].row[index]);
            let kurangPlus=max[i]-matriksKeputusan[i].row[index]
            let kurangMin=min[i]-matriksKeputusan[i].row[index]
            tambahPlus+=Math.pow(kurangPlus,2)
            tambahMin+=Math.pow(kurangMin,2)
              // col.push(matriksPengali[index].row[i]*dtKriteria[index].dataValues.bobot)
          }
          // console.log(tambah)
          dPlus.push(Math.sqrt(tambahPlus))
          dMin.push(Math.sqrt(tambahMin))
          // console.log("tambahPlus")
          // console.log(Math.sqrt(tambahPlus))
          // console.log("tambahMin")
          // console.log(Math.sqrt(tambahMin))
          // matriksKeputusan.push({row:col})
      }
      hasil.push({dPlus})
      hasil.push({dMin})
      //preferensi
      for (let index = 0; index < dPlus.length; index++) {
        let pref = dMin[index]/(dPlus[index]+dMin[index])
        // console.log(pref);
        preferensi.push([pref])
      }
      hasil.push({preferensi})
      var sorted = preferensi.slice().sort(function(a,b){return b-a})
      // console.log(sorted);
      var ranks = preferensi.map(function(v){ return sorted.indexOf(v)+1 });
      // console.log(ranks);
      hasil.push({ranks})
     
          status = 200;
          message = "Sukses";
        // }
    
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
          result: hasil
        };
        return res.status(status).json(data);
      }
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

const topsis = new TopsisController();
module.exports = topsis;