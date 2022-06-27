const services = new DanhSachSanPham();
let arrPhone = [];
let arrPhoneAdmin = [];

let getProductList = () => {
  const promise = services.getList();
  promise.then((resutl) => {
    // console.log(resutl)
    arrPhone = resutl.data;
    HienThiSPUser(arrPhone);
    HienThiSPAdmin(arrPhone);
  });
  promise.catch((error) => {
    console.log(error);
  });
};
getProductList();
// hiển thị sản phẩm
let HienThiSPUser = (mangSP) => {
  let contentUser = "";
  mangSP.map(function (sp) {
    contentUser += `
        <div class="col-4 p-3">
        <div class="card">
          <div class="card-top overflow-hidden">
            <img src="${sp.anhSP}" class="card-img-top img-fluid" alt="..." />
          </div>
          <div class="card-bottom">
            <div class="card-content">
            <h1><span>${sp.tenSP}</span></h1>
            <p>${sp.moTaSP}</p>
            </div>
          <h5>Giá sản phẩm: ${sp.giaSP}</h5>
          </div>
        </div>
        <div class="card-hover d-flex justify-content-around">
        <button class="buttoncart btn btn-info xemchitiet" data-toggle="modal" data-target="#myModal"
        onclick = "xemChiTiet('${sp.id}')">Chi tiết</button>
        <button onclick="addUICart('${sp.tenSP}','${sp.giaSP}')" class="buttoncart btn btn-success">Thêm giỏ hàng</button>
      </div>
      </div>`;
  });
  document.getElementById("bodySP").innerHTML = contentUser;
};
const ELE = (id) => {
  return document.querySelector(id);
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
    HienThiSPUser(samsungTypes);
  } else if (typePhone === "iphone") {
    for (let i = 0; i < phones.length; i++) {
      if (phones[i].loaiSP === typePhone) {
        ipphone.push(phones[i]);
      }
    }
    HienThiSPUser(ipphone);
  } else {
    HienThiSPUser(arrPhone);
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
  });
};
// thêm vào giỏ hàng chưa code local storage
let addCart = [];
let addUICart = (ten, gia) => {
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
  document.getElementById("tblDanhGioHang12").innerHTML = content;
};
