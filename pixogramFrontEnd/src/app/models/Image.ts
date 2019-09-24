export class Image{
    constructor(
            public id:number,
            public fileName:String,
            public fileType:String,
            public userId:number,
            public data:Blob
        ) {
    }  
}