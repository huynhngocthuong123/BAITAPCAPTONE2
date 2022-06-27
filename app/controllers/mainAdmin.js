const services = new DanhSachSanPham();
let arrPhone = [];

let getProductList = () => {
  const promise = services.getList();
  promise.then((resutl) => {
    // console.log(resutl)
    arrPhone = resutl.data;
    HienThiSPUser(arrPhone);
  });
  promise.catch((error) => {
    console.log(error);
  });
};
getProductList();
// hiển thị sản phẩm
let HienThiSPUser = (mangSP) => {
  let contentUser = "";
  let stt = 0;
  mangSP.map(function (sp) {
    contentUser += `
    <tr>
    <td>${++stt}</td>
    <td>${sp.tenSP}</td>
    <td>${sp.dungLuongROM}</td>
    <td>${sp.giaSP}</td>
    <td>${sp.moTaSP}</td>
    <td>
    <button class="btn btn-info xemchitiet" data-toggle="modal" data-target="#myModal"
        onclick = "xemChiTiet('${sp.id}')">chi tiết</button>
        
        <button onclick="deleteProduct('${
          sp.id
        }')" class="btn btn-danger">xóa</button>
    </td>

    </tr>
       `;
  });
  document.getElementById("bodySPAdmin").innerHTML = contentUser;
};
const ELE = (id) => {
  return document.querySelector(id);
};
// thêm sản phẩm
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
    console.log(resutl);
    getProductList();
  });
  promise.catch((error) => {
    console.log(error);
  });
};
ELE("#btnThemMoiSP").addEventListener("click", function () {
  ELE(
    "#myModal .modal-footer"
  ).innerHTML = `<button class="btn btn-success ml-auto" onclick="themSP()">Thêm</button>`;
});
// xóa sp
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
// xem chi tiết
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
    <button id="capnhap" class="btn btn-primary">Cập nhập</button></div>`;
  });
};