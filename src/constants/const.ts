export const image = {
  imgdoc: require('./../assets/image/doc.png'),
  imgxls: require('./../assets/image/xls.png'),
  imgpdf: require('./../assets/image/pdf.png'),
  imgaddfile: require('./../assets/image/new-document.png'),
};


export const  BearerToken = 'ya29.a0AXooCgtxC3J3lMrsiIlg0j_L6_z3A7fijs5TlRpZ1tqYOcyq0pXY2tAQWz27gLsl45gKVLHKS449QnCPs9aGsyX0m-gcJbn72O6Wu4kpWTCg1Rgr0XVMInhVLLWTm5QRfexefmp8EQ3U8XkGaRRopOOY9mGw8lnydRnpaCgYKATYSARASFQHGX2Mivj0rGfuIdNVMN_tGAYM94Q0171'

export const namedate = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const calFileSize = (size: number) => {
  const fsExt = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0;

  while (size > 900) {
    size /= 1024;
    i++;
  }

  var exectSize = Math.floor(size * 100) / 100 + ' ' + fsExt[i];
  return exectSize;
};
