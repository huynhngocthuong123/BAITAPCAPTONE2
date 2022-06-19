const services = new DanhSachSanPham();
function getProductList() {
  const promise = services.getList();
  promise.then((resutl) => {
    // console.log(resutl.data);
    HienThiSP(resutl.data);
  });
  promise.catch((error) => {
    console.log(error);
  });
}
getProductList();
function HienThiSP(mangSP) {
  let content = "";
  mangSP.map(function (sp) {
    content += `
        <div class="col-4 p-3">
        <div class="card">
          <div class="img-card overflow-hidden">
            <img src="${sp.anhSP}" class="card-img-top img-fluid" alt="..." />
          </div>
          <div class="card-body">
            <h1>Tên:<span>${sp.tenSP}</span></h1>
            <h5>Giá sản phẩm: ${sp.giaSP}</h5>
            <p>
              ${sp.moTaSP}
            </p>
          </div>
        </div>
        <div class="card-hover d-flex justify-content-around">
        <button class="btn btn-info">chi tiết</button>
        <button class="btn btn-danger">xóa</button>
      </div>
      </div>`;
  });
  document.getElementById("bodySP").innerHTML = content;
}
const ELE = (id) => {
  return document.querySelector(id);
};
function themSP() {
  let ten = ELE("#TenSP").value;
  let loai = ELE("#loai").value;
  let gia = ELE("#GiaSP").value;
  let ROM = ELE("#dungluongROM").value;
  let RAM = ELE("#dungluongRAM").value;
  let anh = ELE("#HinhSP").value;
  let moTa = ELE("#MoTa").value;
  let sp = new SanPham(ten, loai, gia, ROM, RAM, anh, moTa);

  const promise = services.post(sp);
  promise.then((resutl) => {
    getProductList();
  });
  promise.catch((error) => {
    console.log(error);
  });
}
ELE("#btnThemMoiSP").addEventListener("click", function () {
  ELE(
    "#myModal .modal-footer"
  ).innerHTML = `<button onclick="themSP()">thêm</button>`;
});
