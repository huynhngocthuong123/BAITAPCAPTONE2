const services = new DanhSachSanPham();
const validation = new Validation();
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
    <td>${sp.giaSP}$</td>
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
  // let soLuong = ELE("#soluong").value;

  let isValid = true;

  isValid &= validation.kiemtraRong(
    ten,
    "spanTenSP",
    "Tên sản phẩm không được để trống"
  );
  // Kiểm tra loại điện thoại
  isValid &= validation.kiemTraLoaiSP(
    "loai",
    "spanLoaiSP",
    "Chưa chọn loại điện thoại"
  );
  // Kiểm tra giá
  isValid &= validation.kiemTraGia(gia, "spanGiaSP", "Giá không hợp lệ");
  // Kiểm tra ROm and RAM
  isValid &= validation.kiemTraRom(
    ROM,
    "spanDungLuongROM",
    "Dung lượng không hợp lệ"
  );
  isValid &= validation.kiemTraRom(
    RAM,
    "spanDungLuongRAM",
    "Dung lượng không hợp lệ"
  );

  // Kiểm tra ảnh
  isValid &= validation.kiemtraRong(
    anh,
    "spanHinhAnh",
    "Vui lòng điền link ảnh"
  );

  isValid &= validation.kiemtraRong(moTa, "spanMoTaSP", "Vui lòng nhập mô tả");

  if (isValid) {
    let sp = new SanPham(ten, loai, gia, ROM, RAM, anh, moTa);
    // console.log(ten,loai,gia,ROM,RAM,anh,moTa)
    const promise = services.post(sp);
    promise
      .then((resutl) => {
        console.log(resutl);
        getProductList();
        document.querySelector("#myModal .close").click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // console.log(isValid)
};
ELE("#btnThemMoiSP").addEventListener("click", function () {
  ELE(
    "#myModal .modal-footer"
  ).innerHTML = `<button class=" btn btn-success ml-auto px-5" onclick="themSP()">Thêm</button>`;
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
    <button id="capnhap" onclick="capNhapSP(${result.data.id})" class="btn btn-primary">Cập nhập</button></div>`;
  });
};
// cập nhập sp
let capNhapSP = (id) => {
  let ten = ELE("#TenSP").value;
  let loai = ELE("#loai").value;
  let gia = ELE("#GiaSP").value;
  let ROM = ELE("#dungluongROM").value;
  let RAM = ELE("#dungluongRAM").value;
  let anh = ELE("#HinhSP").value;
  let moTa = ELE("#MoTa").value;
  let sp = new SanPham(ten, loai, gia, ROM, RAM, anh, moTa);
  let promise = services.capNhap(id, sp);
  promise
    .then((result) => {
      console.log(result);
      getProductList();
      document.querySelector("#myModal .close").click();
    })
    .catch((error) => {
      console.log(error);
    });
};

// tìm kiếm sản phẩm

let searchSp = () => {
  let tenSp = ELE("#txtFind").value;
  let mangSp = [];
  let tenThuong = tenSp.toLowerCase();
  arrPhone.map((item) => {
    let tenSpThuong = item.tenSP.toLowerCase();
    if (tenSpThuong.indexOf(tenThuong) > -1) {
      mangSp.push(item);
    }
  });
  return mangSp;
};

ELE("#findSP").onclick = () => {
  let mangdt = searchSp();
  HienThiSPUser(mangdt);
};

ELE("#txtFind").onkeyup = () => {
  let mangdt = searchSp();
  HienThiSPUser(mangdt);
};
