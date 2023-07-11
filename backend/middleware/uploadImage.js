//UPLOAD PDF
const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        //Destino onde será armazenado os arquivos de upload
        destination: (req, file, cb) => {
            cb(null, './public/upload/docUsers')
        },
        //Salvando com o nome original do arquivo
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    //Filtro de tipos de documentos
    //
    fileFilter: (req, file, cb) => {
        //Só será feito o upload se o documento for do tipo mimetype PDF
        const extensaoFile = ['application/pdf']
            .find(formatoAceito => formatoAceito == file.mimetype);
        if (extensaoFile) {
            return cb(null, true);
        }
        return cb(null, false);
    }
}))