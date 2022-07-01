class Validation{
    kiemtraRong(value,spanID,message){
        if(value.trim() == "") {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display="block";
            return false;
        }
        console.log(value)
        document.getElementById(spanID).innerHTML="";
        document.getElementById(spanID).style.display = "none"
        return true;
    }

    kiemTraTen(value,spanID,message) {
        let pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;

        if (value.match(pattern)) {
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display="block";
            return false;
        }
        document.getElementById(spanID).innerHTML="";
        document.getElementById(spanID).style.display = "none"
        return true;
    }

    kiemTraLoaiSP(selectID,spanID,message) {
        let optionIndex = document.getElementById(selectID).selectedIndex;
        if(optionIndex !== 0) {
               //hợp lệ 
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        //không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }

    kiemTraGia(value,spanID,message) {
        let pattern = /^[0-9$]/
        if(value.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
           //không hợp lệ
           document.getElementById(spanID).innerHTML = message;
           document.getElementById(spanID).style.display = "block";
           return false;
    }

    kiemTraRom(value,spanID,message) {
        let pattern = /^[0-9gb]/
        if(value.match(pattern)) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
           //không hợp lệ
           document.getElementById(spanID).innerHTML = message;
           document.getElementById(spanID).style.display = "block";
           return false;
    }
}
