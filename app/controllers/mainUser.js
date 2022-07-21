const services = new DanhSachSanPham();
let arrPhone = [];
let arrPhoneAdmin = [];

let getProductList = () => {
  const promise = services.getList();
  promise.then((resutl) => {
    // console.log(resutl)
    arrPhone = resutl.data;
    HienThiSPUser(arrPhone);
    // HienThiSPAdmin(arrPhone);
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
            <h5>Giá sản phẩm: ${sp.giaSP}$</h5>
          </div>
        </div>
        <div class="card-hover d-flex justify-content-around">
        <button class="buttoncart btn btn-info xemchitiet" data-toggle="modal" data-target="#myModal"
        onclick = "xemChiTiet('${sp.id}')">Chi tiết</button>
        <button onclick="addUICart('${sp.tenSP}','${sp.giaSP}','${sp.id}')" class="buttoncart btn btn-success">Thêm giỏ hàng</button>
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
  // console.log(id);
  const promise = services.getProductItem(id);

  promise.then((result) => {
    // console.log(result);
    ELE("#TenSP").value = result.data.tenSP;
    ELE("#loai").value = result.data.loaiSP;
    ELE("#GiaSP").value = result.data.giaSP;
    ELE("#dungluongROM").value = result.data.dungLuongROM;
    ELE("#dungluongRAM").value = result.data.dungLuongRAM;
    ELE("#HinhSP").value = result.data.anhSP;
    ELE("#MoTa").value = result.data.moTaSP;
  });
};

// lưu localstorage mảng addCart giỏ hàng
let addCart = [];
let setLocalStorage = () => {
  localStorage.setItem("addCart", JSON.stringify(addCart));
}

let addUICart = (ten, gia, id) => { 
  // console.log(ten, gia, id);
  // getLocalStorage();
  addCart.push({
    tenSP: ten,
    giaSP: gia,
    soLuong: 1,
    id: id,
  });
  //  lưu addCart vào localStorage
  setLocalStorage()
  hienThiCart();
};
//  UI giỏ hàng
let hienThiCart = () => {
  let content = "";
  let stt = 0;
  let thanhTien = 0;
  let tongThanhTien = 0;
  addCart.map(function (sp) {
    thanhTien = sp.soLuong * sp.giaSP;
    tongThanhTien += thanhTien;
    content += `
        <tr>
            <td>${++stt}</td>
            <td>${sp.tenSP}</td>
            <td>${sp.giaSP}$</td>
            <td>
                <span onclick="upDown('down',${
                  sp.id
                })" type="button" id="downn" class="btn_updown">-</span>
                <span>${sp.soLuong}</span>
                <span onclick="upDown('up',${
                  sp.id
                })" type="button" class="btn_updown">+</span>
            </td>
            <td>${thanhTien}$</td>
            <td>
                <button onclick = "deleteSPCart('${
                  sp.id
                }')"  class="btn btn-danger"
                type="button"
                >Xóa</button>
            </td>
            <div
            class="modal fade"
            id="exampleModal2"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-clear">
              <div class="modal-content clear">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    BẠN THẬT SỰ MUỐN XÓA
                  </h5>
                </div>
                <div class="modal-footer clear">
                  <button
                    
                    type="button"
                    class="btn btn-success d-flex align-items-center"
                    data-dismiss="modal"
                  >
                    <span>Confirm</span>
                    <ion-icon
                      class="icon1 ml-2"
                      name="checkmark-circle-sharp"
                    ></ion-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </tr>
        `;
    return tongThanhTien;
  });
  document.querySelector("#tongtienthanhtoan").innerHTML = `${tongThanhTien}$`;
  document.getElementById("tblDanhGioHang12").innerHTML = content;
  return tongThanhTien;
};


// thông báo thanh toán tất cả sản phẩm
document.querySelector("#thanhToanAll").addEventListener("click", () => {
  let tongThanhTien = 0;
  tongThanhTien = hienThiCart();
  alert(
    `QUÝ KHÁCH ĐÃ THANH TOÁN THÀNH GIỎ HÀNG
    TỔNG ĐƠN HÀNG : ${tongThanhTien}$`
  );
});
document.querySelector("#xoaAll").addEventListener("click", () => {
  addCart = [];
  confirm("BẠN THẬT SỰ MUỐN XÓA TẤT CẢ?");
  hienThiCart();
});
// tăng giảm số lượng
let upDown = (name, id) => {
  addCart.map((sp) => {
    if (sp.id == id) {
      if (name === "down" && sp.soLuong == 1) {
        alert("số lượng không thể nhỏ hơn 0");
        ELE("#downn").style.visibility = "hidden";
        // deleteSPCart(id);
      } else if (name === "down") {
        sp.soLuong--;
      } else {
        sp.soLuong++;
      }
    }
    setLocalStorage()
    hienThiCart();
  });
};
// xóa sản phẩm khỏi giỏ hàng
let deleteSPCart = (id) => {
  console.log(id);
  console.log(addCart);
  for (let i = 0; i < addCart.length; i++) {
    if (addCart[i].id == id) {
      confirm("BẠN THẬT SỰ MUỐN XÓA?");
      addCart.splice(i, 1);
      setLocalStorage()
      hienThiCart();

      // console.log(addCart[i].id);
    }
    hienThiCart();
  }
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


let getLocalStorage = () => {
  if (localStorage.getItem("addCart") != null) {
    addCart = JSON.parse(localStorage.getItem("addCart"));
    hienThiCart()
  }
}
// hiển thị khi load lại trang web
getLocalStorage();