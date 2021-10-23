const { tb_hasil_survei,tb_kriteria,tb_alternatif,tb_pinjaman } = require("../models");

class SurveiController {
    async SelectData(req, res) {
        req.start = Date.now();
        let status;
        let message;
        let dtDocument;
    
        //get data
        if (req.params.id == null) {
          dtDocument = await tb_hasil_survei.findAll({ order: [["id_hasil_survei", "ASC"]],include:[{model: tb_pinjaman}] });
        } else {
          dtDocument = await tb_hasil_survei.findOne({
            where: { id_hasil_survei: req.params.id },
            order: [["id_hasil_survei", "ASC"]]
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
        let bobot
        let nilai = req.body?.nilai
        switch (nilai) {
            case 0-49:
                bobot=1
                break;
            case 50-59:
                bobot=2
                break;
            case 60-69:
                bobot=3
                break;
            case 70-79:
                bobot=4
                break;
            case 80-100:
                bobot=5
                break;
        
            default:
                bobot=0
                break;
        }
        const item = {
            id_hasil_survei: req.body.id_hasil_survei,
            kode_kriteria: req.body.kode_kriteria,
            kode_alternatif: req.body.kode_alternatif,
            nilai: nilai,
            bobot: bobot,
        };
        dtAlternatif = await tb_hasil_survei.create(item).catch(function(error){
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
        let bobot
        let nilai = req.body?.nilai
        
    
        if (req.params.id == null) {
            status = 400;
            message = "ID harus tercantumkan";
        } else {
            dtSPengacara = await tb_hasil_survei.findOne({
            where: { id_hasil_survei: req.params.id}
            });
            if (!dtSPengacara) {
            status = 404;
            message = "Data Member Tidak Ditemukan";
            } else {
            
               
        switch (nilai) {
            case 0-49:
                bobot=1
                break;
            case 50-59:
                bobot=2
                break;
            case 60-69:
                bobot=3
                break;
            case 70-79:
                bobot=4
                break;
            case 80-100:
                bobot=5
                break;
        
            default:
                bobot=0
                break;
        }
        const item = {
            id_hasil_survei: req.body.id_hasil_survei,
            kode_kriteria: req.body.kode_kriteria,
            kode_alternatif: req.body.kode_alternatif,
            nilai: nilai,
            bobot: bobot,
        };
            dtPengacara = await tb_hasil_survei.update(item, {
                where: { id_hasil_survei: req.params.id}
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
    

    
        if (req.params.id == null) {
        status = 403;
        message = "ID harus tercantumkan";
        id = null;
        } else {
        dtDocument = await tb_hasil_survei.findOne({
            where: { id_hasil_survei: req.params.id},
            order: [["id_hasil_survei", "ASC"]]
        });
        }
        if (!dtDocument) {
        status = 404;
        message = "Data Document Tidak Ditemukan";
        } else {
        await tb_hasil_survei.destroy({ where: { id_hasil_survei: req.params.id} });
        
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

    async SyncronData(req, res) {
    
        req.start = Date.now();
        let status;
        let message;
        let dtAlternatif;
        let dtKriteria;
        let dtSurvei;
        let bobot
        let nilai = req.body?.nilai
        let item=[]
        // switch (nilai) {
        //     case 0-49:
        //         bobot=1
        //         break;
        //     case 50-59:
        //         bobot=2
        //         break;
        //     case 60-69:
        //         bobot=3
        //         break;
        //     case 70-79:
        //         bobot=4
        //         break;
        //     case 80-100:
        //         bobot=5
        //         break;
        
        //     default:
        //         bobot=0
        //         break;
        // }
        dtKriteria = await tb_kriteria.findAll({ order: [["kode_kriteria", "ASC"]] });
        // console.log(dtKriteria.length);
        dtAlternatif = await tb_pinjaman.findAll({ where:{lulus:true},order: [["nik", "ASC"]] });
        // console.log(dtAlternatif.length);
        dtSurvei = await tb_hasil_survei.findAll({ order: [["id_hasil_survei", "ASC"]] });
        // console.log(dtSurvei.length);
        for(let alternatif = 0; alternatif<dtAlternatif.length;alternatif++){
            // console.log(dtAlternatif[alternatif].dataValues.kode_alternatif);
            for (let kriteria = 0; kriteria < dtKriteria.length; kriteria++) {
                // console.log(dtKriteria[kriteria].dataValues.kode_kriteria);
                if(dtSurvei.length===0){
                    item.push({
                        kode_alternatif:dtAlternatif[alternatif].dataValues.nik,
                        kode_kriteria:dtKriteria[kriteria].dataValues.kode_kriteria,
                        nilai:0,
                        bobot:0
                    })
                }else{
                    let ada=false
                    for (let survei = 0; survei < dtSurvei.length; survei++) {
                        if(
                            (dtSurvei[survei].dataValues.nik === dtAlternatif[alternatif].dataValues.nik) 
                            && 
                            (dtSurvei[survei].dataValues.kode_kriteria === dtKriteria[kriteria].dataValues.kode_kriteria)
                            ){
                            ada=true
                        }
                    }
                    // console.log(ada);
                    if(!ada){
                    item.push({
                        kode_alternatif:dtAlternatif[alternatif].dataValues.nik,
                        kode_kriteria:dtKriteria[kriteria].dataValues.kode_kriteria,
                        nilai:0,
                        bobot:0
                    })
                    }
                }
            }
        }
        // const item = {
        //     id_hasil_survei: req.body.id_hasil_survei,
        //     kode_kriteria: req.body.kode_kriteria,
        //     kode_alternatif: req.body.kode_alternatif,
        //     nilai: nilai,
        //     bobot: bobot,
        // };
        // console.log(item);
        for (let i = 0; i < item.length; i++) {
            dtAlternatif = await tb_hasil_survei.create(item[i])
            
        }
        
        // .catch(function(error){
        //     console.log(error.errors[0].message);
        //     status = 400;
        // message = error.errors[0].message;
        // let time = Date.now() - req.start;
        // const used = process.memoryUsage().heapUsed / 1024 / 1024;
        // const data = {
        // diagnostic: {
        //     status: status,
        //     message: message,
        //     memoryUsage: `${Math.round(used * 100) / 100} MB`,
        //     elapsedTime: time,
        //     timestamp: Date(Date.now()).toString()
        // }
        // };
        // return res.status(status).json(data);
        // }).then(function(){
        status = 200;
        message = "berhasil upload";
        // let time = Date.now() - req.start;
        // const used = process.memoryUsage().heapUsed / 1024 / 1024;
        // const data = {
        // diagnostic: {
        //     status: status,
        //     message: message,
        //     memoryUsage: `${Math.round(used * 100) / 100} MB`,
        //     elapsedTime: time,
        //     timestamp: Date(Date.now()).toString()
        // }
        // };
        return res.status(status).json();
        // });
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

    async UpdateDatas(req, res) {
        //set diagnostic
        req.start = Date.now();
        let status;
        let message;
        let dtSPengacara;
        let dtPengacara;
        let item;
        let bobot
        let datas=req.body.formData;
        console.log(datas);
        await datas.forEach(async(data) => {
            if(data.nilai>=0 && data.nilai<=49){
                bobot=1
            }else if(data.nilai>=50 && data.nilai<=59){
                bobot=2
            }else if(data.nilai>=60 && data.nilai<=69){
                bobot=3
            }else if(data.nilai>=70 && data.nilai<=79){
                bobot=4
            }else if(data.nilai>=80 && data.nilai<=100){
                bobot=5
            }else{
                bobot=0
            }     
            item={
                nilai:data.nilai,
                bobot:bobot
            }
            dtPengacara = await tb_hasil_survei.update(item, {
                where: { id_hasil_survei: data.id_survei}
            });
        });
        
            status = 200;
            message = "berhasil update";
    
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
            // result: image
        };
        return res.status(status).json(data);
    
    }
}

const survei = new SurveiController();
module.exports = survei;