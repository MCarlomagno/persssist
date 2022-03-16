export class FilePath {
    static csv = '/images/filetypes/csv.png';
    static doc = '/images/filetypes/doc.png';
    static docx = '/images/filetypes/doc.png';
    static mp3 = '/images/filetypes/mp3.png';
    static mp4 = '/images/filetypes/mp4.png';
    static pdf = '/images/filetypes/pdf.png';
    static photoshop = '/images/filetypes/photoshop.png';
    static png = '/images/filetypes/png.png';
    static ppt = '/images/filetypes/ppt.png';
    static svg = '/images/filetypes/svg.png';
    static undefined = '/images/filetypes/undefined.svg';
    static zip = '/images/filetypes/zip.png';
}

export const fileTypes: any = {
    'text/csv': FilePath.csv,
    'application/msword': FilePath.doc,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FilePath.doc,
    'audio/mpeg': FilePath.mp3,
    'video/mp4': FilePath.mp4,
    'application/pdf': FilePath.pdf,
    'image/vnd.adobe.photoshop': FilePath.photoshop,
    'image/png': FilePath.png,
    'application/vnd.ms-powerpoint': FilePath.ppt,
    'image/svg+xml': FilePath.svg,
    'application/zip': FilePath.zip,
    'undefined': FilePath.undefined,
}