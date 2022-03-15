export class FileType {
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
    'text/csv': FileType.csv,
    'application/msword': FileType.doc,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FileType.doc,
    'audio/mpeg': FileType.mp3,
    'video/mp4': FileType.mp4,
    'application/pdf': FileType.pdf,
    'image/vnd.adobe.photoshop': FileType.photoshop,
    'image/png': FileType.png,
    'application/vnd.ms-powerpoint': FileType.ppt,
    'image/svg+xml': FileType.svg,
    'application/zip': FileType.zip,
    'undefined': FileType.undefined,
}