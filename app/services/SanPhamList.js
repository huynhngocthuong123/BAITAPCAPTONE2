export default class DanhSachSanPham {
  getList(){
    return axios({
      method: "get",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
    });
  };
  post (sp){
    return axios({
      method: "post",
      url: "https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham",
      data:sp,
    });
  };
  delete(id){
    return axios({
      method: "delete",
      url: `https://62a432fd259aba8e10e3e9e9.mockapi.io/sanPham/${id}`,
    });
  }
  
}
