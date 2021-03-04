export  interface fileUpload {
    name:string;
    data: any;
    encode:string;
    tempFilePath: string,
    truncated: boolean,
    mimetype: string ,
    mv: Function;
}