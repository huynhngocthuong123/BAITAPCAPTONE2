const services = new DanhSachSanPham();
let arrPhone = [];
let getProductList = () => {
  const promise = services.getList();
  promise.then((resutl) => {
    // console.log(resutl)
    arrPhone = resutl.data;
    HienThiSP(arrPhone);
  });
  promise.catch((error) => {
    console.log(error);
  });
};
getProductList();
let HienThiSP = (mangSP) => {
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
        <button class="btn btn-info xemchitiet" data-toggle="modal" data-target="#myModal"
        onclick = "xemChiTiet('${sp.id}')">chi tiết</button>
        
        <button onclick="deleteProduct('${sp.id}')" class="btn btn-danger">xóa</button>
      </div>
      </div>`;
  });
  document.getElementById("bodySP").innerHTML = content;
};
const ELE = (id) => {
  return document.querySelector(id);
};
let themSP = () => {
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
};
ELE("#btnThemMoiSP").addEventListener("click", function () {
  ELE(
    "#myModal .modal-footer"
  ).innerHTML = `<button class="btn btn-success ml-auto" onclick="themSP()">thêm</button>`;
});
let deleteProduct = (id) => {
  const promise = services.delete(id);
  promise
    .then((result) => {
      getProductList();
    })
    .catch((error) => {
      console.log(error);
    });
};

// Câu 4 : chọn loại điện thoại
let changeTypePhone = (phones) => {
  let typePhone = document.querySelector("#chonthuonghieu").value;
  const samsungTypes = [];
  const ipphone = [];

  if (typePhone === "samsung") {
    for (let i = 0; i < phones.length; i++) {
      if (phones[i].loaiSP === typePhone) {
        samsungTypes.push(phones[i]);
      }
    }
    HienThiSP(samsungTypes);
  } else if (typePhone === "iphone") {
    for (let i = 0; i < phones.length; i++) {
      if (phones[i].loaiSP === typePhone) {
        ipphone.push(phones[i]);
      }
    }
    HienThiSP(ipphone);
  } else {
    HienThiSP(arrPhone);
  }
};
// vì link script ở file html dùng type = module nên phải xử lý ở js
ELE("#chonthuonghieu").addEventListener("change", () => {
  changeTypePhone(arrPhone);
});

let xemChiTiet = (id) => {
  console.log(id);
  const promise = services.getProductItem(id);

  promise.then((result) => {
    console.log(result);
    ELE("#TenSP").value = result.data.tenSP;
    ELE("#loai").value = result.data.loaiSP;
    ELE("#GiaSP").value = result.data.giaSP;
    ELE("#dungluongROM").value = result.data.dungLuongROM;
    ELE("#dungluongRAM").value = result.data.dungLuongRAM;
    ELE("#HinhSP").value = result.data.anhSP;
    ELE("#MoTa").value = result.data.moTaSP;
    ELE("#myModal .modal-footer").innerHTML = `
    <button onclick="renderCart('${result.data.tenSP}','${result.data.giaSP}')" id="themgiohang" class="btn btn-success">Thêm giỏ hàng</button>
    <button id="capnhap" class="btn btn-primary">Cập nhập</button></div>`;
  });
};
// thêm vào giỏ hàng chưa code local storage
let addCart = [];
function renderCart(ten, gia) {
  addCart.push({
    tenSP: ten,
    giaSP: gia,
  });
  let content = "";
  let stt = 0;

  addCart.map(function (sp) {
    content += `
        <tr>
        <td>${++stt}</td>
            <td>${sp.tenSP}</td>
            <td>${sp.giaSP}</td>
            <td>
                <input id="abc" style="width: 30px" type="number" value="1" min="0"/>
            </td>
            <td>thành tiền</td>
            <td>
                <button class="btn btn-danger">Xóa</button>
            </td>
        </tr>
        `;
  });
  document.getElementById("tblDanhGioHang").innerHTML = content;
}
