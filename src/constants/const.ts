export  const  image = {
    imgdoc : require('./../assets/image/doc.png'),
    imgxls : require('./../assets/image/xls.png'),
    imgpdf : require('./../assets/image/pdf.png') , 
    imgaddfile : require('./../assets/image/new-document.png')
    

}

export const namedate = [
    'Jan'  , 
    'Feb' , 
    'Mar' , 
    'Apr' , 
    'May' , 
    'Jun' , 
    'Jul' , 
    'Aug' , 
    'Sep' , 
    'Oct' , 
    'Nov' , 
    'Dec'
]


export const calFileSize = (size:number)=>{
    const  fsExt = ['Bytes' , 'KB' ,'MB' , 'GB'];
    let i = 0

    while(size>900){
        size/=1024 
        i++
    }


        var exectSize = Math.floor(size*100)/100+' '+  fsExt[i]
    return exectSize
}
   
