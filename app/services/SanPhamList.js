function DanhSachSanPham() {
  this.getList =function (){
    return axios({
      method: "get",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
    });
  };
  this.post = function (sp){
    return axios({
      method: "post",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
      data:sp,
    });
  };
  this.delete = function(id){
    return axios({
      method: "delete",
      url: `https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham/${id}`,
    });
  }

  this.getProductItem = function(id) {
    return axios({
      method: "get",
      url: `https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham/${id}`,
    });
  }
  
}
