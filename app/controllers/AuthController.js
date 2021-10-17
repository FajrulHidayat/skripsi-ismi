const {tb_user} = require("../models");
const authService = require("../services/authService");

class AuthController {
  async regis(req, res) {
    req.start = Date.now();
      let status;
      let message;
      let dtUser;
    //   let id;

      // if(req.body.password == req.body.confirmPassword)
  
        const item = {
            nik: req.body.nik,
            nama: req.body.nama,
            password: req.body.password
          };
     
      
      const dtSUser = await tb_user.findOne({
        where: { nik:item.nik }
      });
      if(!dtSUser){
        dtUser = await tb_user.create(item);
        status = 200;
        message="Akun Berhasil Dibuat"
      }else if(dtSUser.nik === item.nik){
        status = 401
        message="NIK sudah ada"  
      }
      // else{
      //   status=404
      // }
      
      //get diagnostic
      let time = Date.now() - req.start;
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      const data = {
        diagnostic: {
          memoryUsage: `${Math.round(used * 100) / 100} MB`,
          elapsedTime: time,
          timestamp: Date(Date.now()).toString(),
          status:status,
          message:message
        }
      };
        return res.status(status).json(data)
  }
  async login(req, res) {
    req.start = Date.now();
    let status;
    let message;
    let token;
    let nik = req.body.nik;
    let password = req.body.password;
    // let noWA = req.header("noWA");
    let response = {};
    console.log(nik)
    const dtMember = await tb_user.findOne({ where: {nik:nik} });
    if (!dtMember) {
      status = 404;
      message = "Data member tidak ditemukan";
    } else {
      // const match = await bcrypt.compare(password, dtMember.password);
      // if (match === false) {
      if (password != dtMember.password) {
        status = 401;
        message = "Unauthorized";
        token = null;
      } else {
        token = authService().issue({ id: nik, type: "member" });
        token = `Bearer ${token}`;
        status = 200;
        message = "Login berhasil";
        response = {
            token:token,
            nik: dtMember.nik,
          nama: dtMember.nama,
        };
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
      result: response
    };
    res.set({ Authorization: token });
    res.set({ "Access-Control-Allow-Headers": "*" });
    res.set({ "Access-Control-Expose-Headers": "Authorization" });
    return res.status(status).json(data);
  }
  
  async validation(req, res) {
    req.start = Date.now();
    let data;
    let status;
    let message;
    let response;
   
    const token = req.body.Token.split("Bearer ")[1];
  

    let time = Date.now() - req.start;
    authService().verify(token, (err, result) => {
      if (err) {
        status = 401;
        message = err.message;
        response = {
          isvalid: false
        };
      } else {
        status = 200;
        message = "validasi sukses";
        response = {
          isvalid: true,
          type: result.type
        };
      }
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      data = {
        diagnostic: {
          status: status,
          message: message,
          memoryUsage: `${Math.round(used * 100) / 100} MB`,
          elapsedTime: time,
          timestamp: Date(Date.now()).toString()
        },
        result: response
      };
      return res.status(status).json(data);
    });
  }

//   async logout(req, res) {
//     const token = req.body.Token.split("Bearer ")[1];

//     authService().blacklist(token, err => {
//       if (err) {
//         return res.status(401).json({ isvalid: false, err: "Invalid Token!" });
//       }

//       return res.status(200).json({ isvalid: true });
//     });
//     return res.status(200).json({ status: "token revoked" });
//   }

}
const auth = new AuthController()
module.exports =  auth