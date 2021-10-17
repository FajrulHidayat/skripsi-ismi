const sharp = require('sharp');
// const uuidv4 = require('uuid/v4');
const {v4 : uuidv4} = require('uuid')
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer, name,height,width) {
    const filename = Resize.filename(name);
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(height, width, {
        fit: sharp.fit.cover,
        withoutEnlargement: true
      })
      .toFile(filepath);
    
    return filename;
  }
  static filename(name) {
    let fileName = `${uuidv4()}${path.extname(name)}`;
    return fileName;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;