function SanPham(ten,loai,gia,dungLuongROM,dungLuongRAM,anh,
moTa,soLuong) {
  this.tenSP = ten;
  this.loaiSP = loai;
  this.giaSP = gia;
  this.dungLuongROM = dungLuongROM;
  this.dungLuongRAM = dungLuongRAM;
  this.anhSP = anh;
  this.moTaSP = moTa;
  this.soLuongSP = soLuong;
  this.thanhTien = 0;
  this.thanhTienSP = () => {
    this.thanhTien = this.giaSP * this.soLuongSP;
  };
}
