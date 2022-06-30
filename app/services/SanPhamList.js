function DanhSachSanPham() {
  this.getList = () => {
    return axios({
      method: "get",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
    });
  };
  this.post = (sp) => {
    return axios({
      method: "post",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
      data: sp,
    });
  };
  this.delete = (id) => {
    return axios({
      method: "delete",
      url: `https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham/${id}`,
    });
  };

  this.getProductItem = (id) => {
    return axios({
      method: "get",
      url: `https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham/${id}`,
    });
  };
  this.capNhap = (id, sp) => {
    return axios({
      method: "put",
      url: `https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham/${id}`,
      data: sp,
    });
  };


}
