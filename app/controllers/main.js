import SanPham from "../models/SanPham.js";
import DanhSachSanPham from "../services/SanPhamList.js";

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
        <button class="btn btn-info">chi tiết</button>
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
  ).innerHTML = `<button onclick="themSP()">thêm</button>`;
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


let changeTypePhone = (phones) => {
  let typePhone = document.querySelector("#chonthuonghieu").value;
  const samsungTypes = [];
  const ipphone = [];
  
  if(typePhone === 'samsung') {
    for (let i = 0; i < phones.length; i++) {
      if (phones[i].loaiSP === typePhone) {
        samsungTypes.push(phones[i]);
      }
    }
    HienThiSP(samsungTypes)
  } 
  else if(typePhone === 'iphone'){
    for (let i = 0; i < phones.length; i++) {
      if (phones[i].loaiSP === typePhone) {
        ipphone.push(phones[i]);
      }
    }
    HienThiSP(ipphone)
  }else {
    HienThiSP(arrPhone)
  }
  

};
ELE("#chonthuonghieu").addEventListener("change", function(){
  changeTypePhone(arrPhone)
});
