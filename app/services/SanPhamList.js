function DanhSachSanPham() {
  this.getList = () => {
    return axios({
      method: "get",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
    });
  };
  //chưa truyển sp vào nè
  this.post = (sp) => {
    return axios({
      method: "post",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
      data: sp,
    });
  };
}
