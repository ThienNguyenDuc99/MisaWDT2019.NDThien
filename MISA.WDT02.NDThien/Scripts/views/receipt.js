$(document).ready(function () {
    var ref = new Ref();
});

class Ref extends Base {
    
    constructor() {
        super();
        this.InitEventsRef();       
    }
    InitEventsRef() {
        /*Thêm bản ghi**/
        $('.toolbar').on('click', 'button.add', this.OpenDialogAdd.bind(this));
        $('#dialog-add').on('click', '.dauX, .cancel', this.CloseDialogAdd);
        $('#dialog-add').on('click', '.save', this.AddNewCustomer.bind(this));
        $('#dialog-add').on('click', '.save-add', this.AddNewCustomers.bind(this));

        /*Xóa bản ghi**/
        $('.toolbar').on('click', 'button.delete', this.OpenDialogDangerous);
        $('#dialog-delete').on('click', 'button.yes', this.ClickButtonDelete.bind(this));
        $('#dialog-delete').on('click', 'button.no', this.CloseDialogDelete);

        /*Sửa bản ghi**/
        $('.toolbar').on('click', 'button.edit', this.OpenDialogEdit.bind(this));
        $('#dialog-edit').on('click', '.dauX, .cancel', this.CloseDialogEdit.bind(this));
        $('#dialog-edit').on('click', '.save-add', this.EditCustomer.bind(this));
        $('#dialog-edit').on('click', '.save', this.EditCustomer.bind(this));
        $('#dialog-edit').on('click', '.save-add', this.EditCustomers.bind(this));

       /*Load lại dữ liệu**/
        $('.toolbar').on('click', 'button.reload', this.ReloadData.bind(this));
        $('.page-division').on('click', 'button.reload-page', this.ReloadData.bind(this));

        /*Chọn bản ghi**/
        $('.main-table tbody').on('click', 'tr', this.RowOnClick);
        $('.main-table tbody').on('mousedown', 'tr', this.RowsOnClick);

        /*Thiết lập trạng thái cho toolbar**/
        $('.main-table tbody').on('click', 'tr', this.SetStatusButton1);
        $('.main-table tbody').on('focusout', 'tr', this.SetStatusButton2);

        /*Validate form**/
        $('#dialog-add').on('blur', 'input[property="phone"]', this.ValidatePhone);    
        $('#dialog-add').on('blur', 'input[property="customerName"]', this.ValidateName);  
        $('#dialog-add').on('blur', 'input[property="born"]', this.ValidateBorn);  
        $('#dialog-add').on('blur', 'input[property="customerId"]', this.ValidateId); 
        $('#dialog-add').on('mouseenter', 'input[property="customerId"]', this.HovercustomerId); 
        $('#dialog-add').on('mouseleave', 'input[property="customerId"]', this.UnHovercustomerId); 
        $('.dialog').on('mouseenter', '.dialog-component-child .icon-danger.icon-phone', this.DispayDangerPhone); 
        $('.dialog').on('mouseleave', '.dialog-component-child .icon-danger.icon-phone', this.UnDispayDangerPhone);
        $('.dialog').on('mouseenter', '.dialog-component-child .icon-danger.icon-id', this.DispayDangerId);
        $('.dialog').on('mouseleave', '.dialog-component-child .icon-danger.icon-id', this.UnDispayDangerId);
        $('.dialog').on('mouseenter', '.dialog-component-child .icon-danger.icon-name', this.DispayDangerName);
        $('.dialog').on('mouseleave', '.dialog-component-child .icon-danger.icon-name', this.UnDispayDangerName);
        $('.dialog').on('mouseenter', '.dialog-component-child .icon-danger.icon-born', this.DispayDangerBorn);
        $('.dialog').on('mouseleave', '.dialog-component-child .icon-danger.icon-born', this.UnDispayDangerBorn);
        $('#dialog-edit').on('blur', 'input[property="phone"]', this.ValidatePhone1);
        $('#dialog-edit').on('blur', 'input[property="customerName"]', this.ValidateName1);
        $('#dialog-edit').on('blur', 'input[property="born"]', this.ValidateBorn1);
        $('#dialog-edit').on('blur', 'input[property="customerId"]', this.ValidateId1); 
        
        /*Xác nhận sự thay đổi trong form**/
       /// $('#edit-cofirm').on('click', 'button.yes', this.EditCustomer.bind(this));
        $('#edit-cofirm').on('click', 'button.yes', this.YesEdit.bind(this));
        $('#edit-cofirm').on('click', 'button.no', this.NoEdit);
        $('#edit-cofirm').on('click', 'button.cancel', this.CancelEdit);
        $('#add-cofirm').on('click', 'button.yes', this.YesAdd.bind(this));
        $('#add-cofirm').on('click', 'button.no', this.NoAdd);
        $('#add-cofirm').on('click', 'button.cancel', this.CancelAdd);

        /*Phần phân trang*/
        $('.page-division').on('keyup', '#pageIndex', this.PagingTable.bind(this));
        $('.page-division').on('change', '#pageSize', this.PagingTable2.bind(this));
        $('.page-division').on('click', '.page-first', this.PageFirst.bind(this));
        $('.page-division').on('click', '.page-last', this.PageLast.bind(this));
        $('.page-division').on('click', '.page-next', this.PageNext.bind(this));
        $('.page-division').on('click', '.page-prev', this.PagePrev.bind(this));
    }

    PagePrev() {
        $('.loading').show();
        var pageIndex = $('#pageIndex').val();
        pageIndex = parseInt(pageIndex) - 1;
        pageIndex = pageIndex.toString();
        $('#pageIndex')[0].value = pageIndex;
        this.loadData();
    }

    PageNext() {
        $('.loading').show();
        var pageIndex = $('#pageIndex').val();
        pageIndex = parseInt(pageIndex) + 1;       
        pageIndex = pageIndex.toString();
        $('#pageIndex')[0].value = pageIndex;
        this.loadData();
    }

    PageLast() {
        $('.loading').show();
        var me = this;
        var data = this.getData();
        var lengthData = data.length;
        var pageSize = $('#pageSize').val();
        var pageIndex = $('#pageIndex').val();
        var lengthPage = lengthData / pageSize;
        lengthPage = Math.ceil(lengthPage);
        lengthPage = lengthPage.toString();
        $('#pageIndex')[0].value = lengthPage;
        me.loadData();
    }

    PageFirst() {
        $('.loading').show();
        var me = this;
        $('#pageIndex')[0].value = "1";
            me.loadData();
    }

    /**
     * Hàm phân trang khi nhấn enter
     * Người  tạo: Nguyễn Đức Thiện
     * Ngày tạo: 27-08-2019
     * */
    PagingTable(event) {
 
        var me = this;
        var data = this.getData();       
        var lengthData = data.length;
        var pageSize = $('#pageSize').val();
        var pageIndex = $('#pageIndex').val();
        pageIndex = parseInt(pageIndex);
        pageSize = parseInt(pageSize);
        var lengthPage = lengthData / pageSize;
        lengthPage = Math.ceil(lengthPage);
        lengthPage = lengthPage.toString();        
        if (pageIndex > lengthPage) {
            $('#pageIndex')[0].value = lengthPage;
        }
        if (pageIndex < 1) {
            $('#pageIndex')[0].value = 1;
        }
        if (event.keyCode === 13) {
            $('.loading').show();
            me.loadData();
        }
    }
    /**
     * Hàm phân trang khi lựa chọn kích thước trang
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 27-08-2019
     * */
    PagingTable2() {
        var me = this;
        var data = this.getData();
        var lengthData = data.length;
        var pageSize = $('#pageSize').val();
        var pageIndex = $('#pageIndex').val();
        var lengthPage = lengthData / pageSize;
        lengthPage = Math.ceil(lengthPage);
        lengthPage = lengthPage.toString();
        if (pageIndex > lengthPage) {
            $('#pageIndex')[0].value = lengthPage;
        }
         me.loadData();
    }
    /**
     * Hàm validate trường số điện thoại
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 25/08/2019
     * */
    ValidatePhone() {      
        var vl = this.value;
        var a = vl.split("");
        var l = vl.split("").length;
        var kt = 1;
        if (l === 0) {
            $(this).addClass('danger');
            $('#dialog-add .icon-phone.icon-danger').css('display', 'block');
        }
        else {
            for (var i = 0; i < l; i++) {
                if (a[i] != "0" && a[i] != "1" && a[i] != "2" && a[i] != "3" && a[i] != "4" && a[i] != "5" && a[i] != "6" && a[i] != "7" && a[i] != "8" && a[i] != "9") {
                    $(this).addClass('danger');
                    $('#dialog-add .icon-phone.icon-danger').css('display', 'block');
                    $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của bạn chỉ bảo gồm các chữ số từ 0 đến 9!";
                    kt = 0;
                }
            }
            if (kt == 1) {
                $(this).removeClass('danger');
                $('#dialog-add .icon-phone.icon-danger').css('display', 'none');
            }
        }
    }
    /**
     * Validate cho các trường mã số, tên và ngày sinh
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 25/08/2019
     * */
    ValidateName() {
        var valName = this.value;
        if (valName === "") {
            $(this).addClass('danger');
            $('#dialog-add .icon-name.icon-danger').css('display', 'block');
        }
        else {
            $(this).removeClass('danger');
            $('#dialog-add .icon-name.icon-danger').css('display', 'none');
        }
    }

    ValidateBorn() {
        var valName = this.value;
        valName = new Date(valName);
        var a = typeof (valName);
        var day = valName.getDate();
        var month = valName.getMonth() + 1;
        var year = valName.getFullYear();
        if (valName === "") {
            $(this).addClass('danger');
            $('#dialog-add .icon-born.icon-danger').css('display', 'block');
            $('#dialog-add .stupidBoy').addClass('std');
        }
        else if(year>2019 || year<1800){
            $(this).addClass('danger');
            $('#dialog-add .icon-born.icon-danger').css('display', 'block');
            $('#dialog-add .stupidBoy').addClass('std');
            $('.danger-content.bornn')[0].innerHTML = "Năm sinh lớn hơn 2019 hoặc nhỏ hơn 1800 là không hợp lê!";
        }
        else {
            $(this).removeClass('danger');
            $('#dialog-add .icon-born.icon-danger').css('display', 'none');
            $('#dialog-add .stupidBoy').removeClass('std');
        }
    }

    ValidateId() {
        var valName = this.value;
        if (valName === "") {
            $(this).addClass('danger');
            $('#dialog-add .icon-id.icon-danger').css('display', 'block');
        }
        else {
            $(this).removeClass('danger');
            $('#dialog-add .icon-id.icon-danger').css('display', 'none');
        }
    }

    /**
     * Hiện thông báo khi hover vào cảnh báo trong dialog
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 28
     * */
    DispayDangerPhone() {
        $('.danger-content.phonee').css('display', 'block');
        
    }
    UnDispayDangerPhone() {
        $('.danger-content.phonee').css('display', 'none');
    }
    DispayDangerId() {
        $('.danger-content.idd').css('display', 'block');

    }
    UnDispayDangerId() {
        $('.danger-content.idd').css('display', 'none');
    }
    DispayDangerName() {
        $('.danger-content.namee').css('display', 'block');

    }
    UnDispayDangerName() {
        $('.danger-content.namee').css('display', 'none');
    }
    DispayDangerBorn() {
        $('.danger-content.bornn').css('display', 'block');

    }
    UnDispayDangerBorn() {
        $('.danger-content.bornn').css('display', 'none');
    }
   
    /**
     * Chức năng thêm một khách hàng
     * Người tạo: Nguyễn Đức Thiện
     * Thời gian: 23/08/2019
     * */

    /** Mở dialog thêm mới */
    OpenDialogAdd() {
        var inputvalues = $('#dialog-add .ip');
        $.each(inputvalues, function (index, item) {
            this.value = "";
        });
        $('#dialog-add .ip')[0].value = this.AddCustomerId();
        var dialog = $('#dialog-add');
        $('.father .Right').css('opacity', '0.1');
        $('.father .nav-menu').css('opacity', '0.1');
        dialog.css("display", "block");      
        $('.ip.danger').removeClass('danger');
        $('.dialog .icon-danger').css('display', 'none');
        $('#dialog-add .stupidBoy').removeClass('std');
    }

    /** Đóng dialog thêm mới */
    CloseDialogAdd() {
        var checkvalue = 1;
        var listIp = $('#dialog-add .ip');
        for (var i = 1; i < listIp.length; i++) {
            if (listIp[i].value != "") {
                checkvalue = 0;
            }
        }
        if (checkvalue) {
            var dialog = $('#dialog-add');
            dialog.css("display", "none");
            $('.father .Right').css('opacity', '1');
            $('.father .nav-menu').css('opacity', '1');
        }
        else {
            $("#add-cofirm").css('display', 'block');
            $('.dialog').css('display', 'none');
        }
    }

   /**Thực hiện tác vụ xác nhận đóng cửa dialog thêm mới khi dữ liệu thay đổi */
    NoAdd() {
        $("#add-cofirm").css('display', 'none');
        $('.father .Right').css('opacity', '1');
        $('.father .nav-menu').css('opacity', '1');
    }

    CancelAdd() {
        $("#add-cofirm").css('display', 'none');
        $('#dialog-add').css('display', 'block');
    }

    YesAdd() {
        $("#add-cofirm").css('display', 'none');
        $('#dialog-add').css('display', 'block');
        var valId = $('#dialog-add .ip[property = "customerId"]').val();
        var valName = $('#dialog-add .ip[property = "customerName"]').val();
        var valPhone = $('#dialog-add .ip[property = "phone"]').val();
        var valBorn = $('#dialog-add .ip[property = "born"]').val();
        if (valId === "") {
            $('#dialog-add .ip[property = "customerId"]').addClass('danger');
            $('#dialog-add .icon-id.icon-danger').css('display', 'block');
        }
        if (valName === "") {
            $('#dialog-add .ip[property = "customerName"]').addClass('danger');
            $('#dialog-add .icon-name.icon-danger').css('display', 'block');
        }
        if (valPhone === "") {
            $('#dialog-add .ip[property = "phone"]').addClass('danger');
            $('#dialog-add .icon-phone.icon-danger').css('display', 'block');
            $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của bạn chỉ bảo gồm các chữ số từ 0 đến 9!";
        }
        if (valBorn === "") {
            $('#dialog-add .ip[property = "born"]').addClass('danger');
            $('#dialog-add .stupidBoy').addClass('std');
            $('#dialog-add .icon-born.icon-danger').css('display', 'block');
        }

        if ($('#dialog-add .ip[property = "born"]').hasClass('danger')) {

        }
        if ($('#dialog-add .ip[property = "phone"]').hasClass('danger')) {

        }

        if (valId != "" && valName != "" && valPhone != "" && valBorn != "" && !$('#dialog-add .ip[property = "phone"]').hasClass('danger') && !$('#dialog-add .ip[property = "born"]').hasClass('danger')) {
            var me = this;
            var listInput = $('#dialog-add [property]');
            var object = {};
            $.each(listInput, function (index, item) {
                var propertyName = item.getAttribute('property');
                var value = $(this).val();
                object[propertyName] = value;
            });
            $.ajax({
                method: 'POST',
                url: '/refs',
                dataType: "json",
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function () {
                    me.loadData();
                    $('#dialog-add').css("display", "none");
                    $('.father .Right').css('opacity', '1');
                    $('.father .nav-menu').css('opacity', '1');
                },
                error: function () {
                    alert('Không thêm được!');
                },
            });
        }
    }

    /** 
     *  Hàm hover vào input customerId 
     *  Người tạo: Nguyễn Đức Thiện
     *  Ngày tạo: 26/07/2019
     * **/
    HovercustomerId() {
        $('#dialog-add .danger-content.idd').css('display', 'block');
        $('#dialog-add .danger-content.idd')[0].innerHTML = "Mã khách hàng được sinh tự động. Bạn không thể thay đổi.";
    }

    UnHovercustomerId() {
        $('#dialog-add .danger-content.idd').css('display', 'none');
    }

    /** Hàm thực hiện chức năng cất */
    AddNewCustomer() {
            var valId = $('#dialog-add .ip[property = "customerId"]').val();
            var valName = $('#dialog-add .ip[property = "customerName"]').val();
            var valPhone = $('#dialog-add .ip[property = "phone"]').val();
            var valBorn = $('#dialog-add .ip[property = "born"]').val();
            if (valId === "") {
                $('#dialog-add .ip[property = "customerId"]').addClass('danger');
                $('#dialog-add .icon-id.icon-danger').css('display', 'block');
            }
            if (valName === "") {
                $('#dialog-add .ip[property = "customerName"]').addClass('danger');
                $('#dialog-add .icon-name.icon-danger').css('display', 'block');
            }
            if (valPhone === "") {
                $('#dialog-add .ip[property = "phone"]').addClass('danger');
                $('#dialog-add .icon-phone.icon-danger').css('display', 'block');
                $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của bạn chỉ bảo gồm các chữ số từ 0 đến 9!";
            }
            if (valBorn === "") {
                $('#dialog-add .ip[property = "born"]').addClass('danger');
                $('#dialog-add .stupidBoy').addClass('std');
                $('#dialog-add .icon-born.icon-danger').css('display', 'block');
            }

            if ($('#dialog-add .ip[property = "born"]').hasClass('danger')) {

            }
            if ($('#dialog-add .ip[property = "phone"]').hasClass('danger')) {

            }

           if (valId != "" && valName != "" && valPhone != "" && valBorn != "" && !$('#dialog-add .ip[property = "phone"]').hasClass('danger') && !$('#dialog-add .ip[property = "born"]').hasClass('danger')) {
                var me = this;
                var listInput = $('#dialog-add [property]');
                var object = {};
                $.each(listInput, function (index, item) {
                    var propertyName = item.getAttribute('property');
                    var value = $(this).val();
                    object[propertyName] = value;
                });
                $.ajax({
                    method: 'POST',
                    url: '/refs',
                    dataType: "json",
                    data: JSON.stringify(object),
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        me.loadData();
                        $('#dialog-add').css("display", "none");
                        $('.father .Right').css('opacity', '1');
                        $('.father .nav-menu').css('opacity', '1');
                    },
                    error: function () {
                        alert('Không thêm được!');
                    },
                });
            }
        }

   /** Hàm thực hiện chức nằng cất và thêm */
    AddNewCustomers() {    
        var me = this;
        //if (!$('#dialog-add .ip[property = "phone"]').hasClass('danger')) {
            var valId = $('#dialog-add .ip[property = "customerId"]').val();
            var valName = $('#dialog-add .ip[property = "customerName"]').val();
            var valPhone = $('#dialog-add .ip[property = "phone"]').val();
            var valBorn = $('#dialog-add .ip[property = "born"]').val();
            if (valId === "") {
                $('#dialog-add .ip[property = "customerId"]').addClass('danger');
                $('#dialog-add .icon-id.icon-danger').css('display', 'block');
            }
            if (valName === "") {
                $('#dialog-add .ip[property = "customerName"]').addClass('danger');
                $('#dialog-add .icon-name.icon-danger').css('display', 'block');
            }
            if (valPhone === "") {
                $('#dialog-add .ip[property = "phone"]').addClass('danger');
                $('#dialog-add .icon-phone.icon-danger').css('display', 'block');
                $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của bạn chỉ bảo gồm các chữ số từ 0 đến 9!";
            }
            if (valBorn === "") {
                $('#dialog-add .ip[property = "born"]').addClass('danger');
                $('#dialog-add .stupidBoy').addClass('std');
                $('#dialog-add .icon-born.icon-danger').css('display', 'block');
            }

            if ($('#dialog-add .ip[property = "born"]').hasClass('danger')) {

            }
            if ($('#dialog-add .ip[property = "phone"]').hasClass('danger')) {

            }
           if (valId != "" && valName != "" && valPhone != "" && valBorn != "" && !$('#dialog-add .ip[property = "phone"]').hasClass('danger') && !$('#dialog-add .ip[property = "born"]').hasClass('danger')) {
                var listInput = $('#dialog-add [property]');
                var object = {};
                $.each(listInput, function (index, item) {
                    var propertyName = item.getAttribute('property');
                    var value = $(this).val();
                    object[propertyName] = value;
                });
                $.ajax({
                    method: 'POST',
                    url: '/refs',
                    dataType: "json",
                    data: JSON.stringify(object),
                    contentType: "application/json; charset=utf-8",
                    success: function () {
                        me.loadData();
                        var inputvalues = $('#dialog-add .ip');
                        $.each(inputvalues, function (index, item) {
                            this.value = "";
                        });
                        setTimeout(function () {                            
                            $('#dialog-add .ip')[0].value = me.AddCustomerId();
                        }, 100);
                    },
                    error: function () {
                        alert('Không thêm được!');
                    },
                });
            }
    }

    /**
     * Hàm validate trường số điện thoại 
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 25/08/2019
     * */
    ValidatePhone1() {
        var vl = this.value;
        var a = vl.split("");
        var l = vl.split("").length;
        if (l === 0) {
            $(this).addClass('danger');
            $('#dialog-edit .icon-phone.icon-danger').css('display', 'block');
        }
        else {
            var kt = 1;
            for (var i = 0; i < l; i++) {
                if (a[i] != "0" && a[i] != "1" && a[i] != "2" && a[i] != "3" && a[i] != "4" && a[i] != "5" && a[i] != "6" && a[i] != "7" && a[i] != "8" && a[i] != "9") {
                    $(this).addClass('danger');
                    $('#dialog-edit .icon-phone.icon-danger').css('display', 'block');
                    $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của bạn chỉ bảo gồm các chữ số từ 0 đến 9!";
                    kt = 0;
                }
            }
            if (kt == 1) {
                $(this).removeClass('danger');
                $('#dialog-edit .icon-phone.icon-danger').css('display', 'none');
            }
        }
    }
    /**
     * Validate cho các trường mã số, tên và ngày sinh
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 25/08/2019
     * */
    ValidateName1() {
        var valName = this.value;
        if (valName === "") {
            $(this).addClass('danger');
            $('#dialog-edit .icon-name.icon-danger').css('display', 'block');
        }
        else {
            $(this).removeClass('danger');
            $('#dialog-edit .icon-name.icon-danger').css('display', 'none');
        }
    }

    ValidateBorn1() {
        var valName = this.value;
        valName = new Date(valName);
        var a = typeof (valName);
        var day = valName.getDate();
        var month = valName.getMonth() + 1;
        var year = valName.getFullYear();
        if (valName === "") {
            $(this).addClass('danger');
            $('#dialog-edit .icon-born.icon-danger').css('display', 'block');
            $('#dialog-edit .stupidBoy').addClass('std');
        }
        else if (year > 2019 || year < 1800) {
            $(this).addClass('danger');
            $('#dialog-edit .icon-born.icon-danger').css('display', 'block');
            $('#dialog-edit .stupidBoy').addClass('std');
            $('.danger-content.bornn')[0].innerHTML = "Năm sinh lớn hơn 2019 hoặc nhỏ hơn 1800 là không hợp lê!";
        }
        else {
            $(this).removeClass('danger');
            $('#dialog-edit .icon-born.icon-danger').css('display', 'none');
            $('#dialog-edit .stupidBoy').removeClass('std');
        }
    }

    ValidateId1() {
        var ipValue = $('.main-table tbody tr.selected td')[0].innerHTML;
        var valName = this.value;
        if (valName === "") {
            $(this).addClass('danger');
            $('#dialog-edit .icon-id.icon-danger').css('display', 'block');
        }
        else if (valName != ipValue) {
            $(this).addClass('danger');
            $('#dialog-edit .icon-id.icon-danger').css('display', 'block');
            $('#dialog-edit .danger-content.idd')[0].innerHTML = "Bạn không thể thay đổi trường này!";
        }
        else {
            $(this).removeClass('danger');
            $('#dialog-edit .icon-id.icon-danger').css('display', 'none');
        }
    }
   
    /**
     * Chức năng sửa
     * Người thực hiện: Nguyễn Đức Thiện
     * Ngày tạo: 24/08/2019
     * */
    /** Mở dialog sửa  */
    OpenDialogEdit() {     
        var data = this.getData1();      
        var listTr = $('.main-table tbody tr');
        $.each(listTr, function (index, item) {
            if ($(item).hasClass('selected')) {  
                $('#dialog-edit .ip[property = "customerId"]')[0].value = data[index].customerId;
                $('#dialog-edit .ip[property = "customerName"]')[0].value = data[index].customerName;
                $('#dialog-edit .ip[property = "phone"]')[0].value = data[index].phone;
                $('#dialog-edit .ip[property = "customerGroup"]')[0].value = data[index].customerGroup;
                $('#dialog-edit .ip[property = "company"]')[0].value = data[index].company;
                $('#dialog-edit .ip[property = "taxCode"]')[0].value = data[index].taxCode;
                $('#dialog-edit .ip[property = "andress"]')[0].value = data[index].andress;
                $('#dialog-edit .ip[property = "email"]')[0].value = data[index].email;
                $('#dialog-edit .ip[property = "note"]')[0].value = data[index].note;
                var value = new Date(data[index].born);
                $('#dialog-edit .ip[property = "born"]')[0].value = value.formatddMMyyyy();
            }
 
        });
        var dialog = $('#dialog-edit');
        $('.father .Right').css('opacity', '0.1');
        $('.father .nav-menu').css('opacity', '0.1');
        dialog.css("display", "block");
    }
    /** Đóng dialog sửa */
    CloseDialogEdit() {
        var checkinputvalue = 1;
        var data = this.getData1();
        var listTr = $('.main-table tbody tr');
        $.each(listTr, function (index, item) {
            if ($(item).hasClass('selected')) {
                if ($('#dialog-edit .ip[property = "customerId"]')[0].value != data[index].customerId) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "customerName"]')[0].value != data[index].customerName) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "phone"]')[0].value != data[index].phone) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "customerGroup"]')[0].value != data[index].customerGroup) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "company"]')[0].value != data[index].company) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "taxCode"]')[0].value != data[index].taxCode) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "andress"]')[0].value != data[index].andress) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "email"]')[0].value != data[index].email) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "note"]')[0].value != data[index].note) {
                    checkinputvalue = 0;
                }
                if ($('#dialog-edit .ip[property = "born"]')[0].value + "T00:00:00" != data[index].born) {
                    checkinputvalue = 0;
                }
            }

        });
        if (checkinputvalue == 1) {
            var dialog = $('#dialog-edit');
            dialog.css("display", "none");
            $('.father .Right').css('opacity', '1');
            $('.father .nav-menu').css('opacity', '1');
        }
        else {
            $("#edit-cofirm").css('display', 'block');
            $('.dialog').css('display', 'none');
        }
    }

    CancelEdit() {
        $("#edit-cofirm").css('display', 'none');
        $('#dialog-edit').css('display', 'block');
    }

    NoEdit() {
        $("#edit-cofirm").css('display', 'none');
        $('.father .Right').css('opacity', '1');
        $('.father .nav-menu').css('opacity', '1');
    }

    YesEdit() {
        $("#edit-cofirm").css('display', 'none');
        $('#dialog-edit').css('display', 'block');
        var valId = $('#dialog-edit .ip[property = "customerId"]').val();
        var valName = $('#dialog-edit .ip[property = "customerName"]').val();
        var valPhone = $('#dialog-edit .ip[property = "phone"]').val();
        var valBorn = $('#dialog-edit .ip[property = "born"]').val();
        if (valId === "") {
            $('#dialog-edit .ip[property = "customerId"]').addClass('danger');
            $('#dialog-edit .icon-id.icon-danger').css('display', 'block');
        }
        if (valName === "") {
            $('#dialog-edit .ip[property = "customerName"]').addClass('danger');
            $('#dialog-edit .icon-name.icon-danger').css('display', 'block');
        }
        if (valPhone === "") {
            $('#dialog-edit .ip[property = "phone"]').addClass('danger');
            $('#dialog-edit .icon-phone.icon-danger').css('display', 'block');
            $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của chỉ bảo gồm các chữ số từ 0 đến 9!";
        }
        if (valBorn === "") {
            $('#dialog-edit .ip[property = "born"]').addClass('danger');
            $('#dialog-edit .stupidBoy').addClass('std');
            $('#dialog-edit .icon-born.icon-danger').css('display', 'block');
        }
        if ($('#dialog-edit .ip[property = "phone"]').hasClass('danger')) {
        }
        if ($('#dialog-edit .ip[property = "born"]').hasClass('danger')) {
        }
        if (valId != "" && valName != "" && valPhone != "" && valBorn != "" && !$('#dialog-edit .ip[property = "phone"]').hasClass('danger') && !$('#dialog-edit .ip[property = "born"]').hasClass('danger')) {
            var me = this;
            var listInput = $('#dialog-edit [property]');
            var object = {};
            $.each(listInput, function (index, item) {
                var propertyName = item.getAttribute('property');
                var value = $(this).val();
                object[propertyName] = value;
            });
            $.ajax({
                method: 'PUT',
                url: '/refs',
                dataType: "json",
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    if (res.Success) {
                        me.loadData();
                        $('#dialog-edit').css('display', 'none');
                        $('.father .Right').css('opacity', '1');
                        $('.father .nav-menu').css('opacity', '1');

                    } else {
                        alert(res.Message);
                    }
                }
            });
        }
    }
    /* Chức năng sửa**/
    EditCustomer() {
            var valId = $('#dialog-edit .ip[property = "customerId"]').val();
            var valName = $('#dialog-edit .ip[property = "customerName"]').val();
            var valPhone = $('#dialog-edit .ip[property = "phone"]').val();
            var valBorn = $('#dialog-edit .ip[property = "born"]').val();
            if (valId === "") {
                $('#dialog-edit .ip[property = "customerId"]').addClass('danger');
                $('#dialog-edit .icon-id.icon-danger').css('display', 'block');
            }
            if (valName === "") {
                $('#dialog-edit .ip[property = "customerName"]').addClass('danger');
                $('#dialog-edit .icon-name.icon-danger').css('display', 'block');
            }
            if (valPhone === "") {
                $('#dialog-edit .ip[property = "phone"]').addClass('danger');
                $('#dialog-edit .icon-phone.icon-danger').css('display', 'block');
                $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của chỉ bảo gồm các chữ số từ 0 đến 9!";
            }
            if (valBorn === "") {
                $('#dialog-edit .ip[property = "born"]').addClass('danger');
                $('#dialog-edit .stupidBoy').addClass('std');
                $('#dialog-edit .icon-born.icon-danger').css('display', 'block');
            }
            if ($('#dialog-edit .ip[property = "phone"]').hasClass('danger')) {
           }
            if ($('#dialog-edit .ip[property = "born"]').hasClass('danger')) {
            }
            if (valId != "" && valName != "" && valPhone != "" && valBorn != "" && !$('#dialog-edit .ip[property = "phone"]').hasClass('danger') && !$('#dialog-edit .ip[property = "born"]').hasClass('danger')) {
                var me = this;
                var listInput = $('#dialog-edit [property]');
                var object = {};
                $.each(listInput, function (index, item) {
                    var propertyName = item.getAttribute('property');
                    var value = $(this).val();
                    object[propertyName] = value;
                });
                $.ajax({
                    method: 'PUT',
                    url: '/refs',
                    dataType: "json",
                    data: JSON.stringify(object),
                    contentType: "application/json; charset=utf-8",
                    success: function (res) {
                        if (res.Success) {
                            me.loadData();
                            $('#dialog-edit').css('display', 'none');
                            $('.father .Right').css('opacity', '1');
                            $('.father .nav-menu').css('opacity', '1');

                        } else {
                            alert(res.Message);
                        }
                    }
                });
            }
    }
/* Chức năng sửa và thêm**/
    EditCustomers() {
        var me = this;
        var errors = $('#dialog-edit .ip.danger').length;
        if (errors < 1) {
            var valId = $('#dialog-edit .ip[property = "customerId"]').val();
            var valName = $('#dialog-edit .ip[property = "customerName"]').val();
            var valPhone = $('#dialog-edit .ip[property = "phone"]').val();
            var valBorn = $('#dialog-edit .ip[property = "born"]').val();
            if (valId === "") {
                $('#dialog-edit .ip[property = "customerId"]').addClass('danger');
                $('#dialog-edit .icon-id.icon-danger').css('display', 'block');
            }
            if (valName === "") {
                $('#dialog-edit .ip[property = "customerName"]').addClass('danger');
                $('#dialog-edit .icon-name.icon-danger').css('display', 'block');
            }
            if (valPhone === "") {
                $('#dialog-edit .ip[property = "phone"]').addClass('danger');
                $('#dialog-edit .icon-phone.icon-danger').css('display', 'block');
                $('.danger-content.phonee')[0].innerHTML = "Số điện thoại của bạn chỉ bảo gồm các chữ số từ 0 đến 9!";
            }
            if (valBorn === "") {
                $('#dialog-edit .ip[property = "born"]').addClass('danger');
                $('#dialog-edit .stupidBoy').addClass('std');
                $('#dialog-edit .icon-born.icon-danger').css('display', 'block');
            }
            if ($('#dialog-edit .ip[property = "phone"]').hasClass('danger')) {
            }
            if ($('#dialog-edit .ip[property = "born"]').hasClass('danger')) {
            }
            if (valId != "" && valName != "" && valPhone != "" && valBorn != "" && !$('#dialog-edit .ip[property = "phone"]').hasClass('danger') && !$('#dialog-edit .ip[property = "born"]').hasClass('danger')) {
                $('.dialog').css("display", "none");
                $('.father .Right').css('opacity', '1');
                $('.father .nav-menu').css('opacity', '1');
                var dialog = $('#dialog-add');
                $('.father .Right').css('opacity', '0.1');
                $('.father .nav-menu').css('opacity', '0.1');
                dialog.css("display", "block");
                var inputvalues = $('#dialog-add .ip');
                $.each(inputvalues, function (index, item) {
                    this.value = "";
                });
                $('#dialog-add .ip')[0].value = me.AddCustomerId();
            }
        }

    }
    /** Hàm thực hiện chức năng xóa một hoặc nhiều khách hàng
    * Người tạo: Nguyễn Đức Thiện
    * Thời gian: 24/08/2019
    * */
    OpenDialogDangerous() {
        $('.main-table tbody tr').removeAttr('select');
        var dialog = $('#dialog-delete');
        dialog.css("display", "block");
        $('.father .Right').css('opacity', '0.1');
        $('.father .nav-menu').css('opacity', '0.1');
        var List = $('.main-table tbody tr.selected');
        var list = $('.main-table tbody tr.selected td');
        var id = list[0].innerHTML;
        var name = list[1].innerHTML;
        if (List.length == 1) {
            $('#dialog-delete .dialog-delete-center .content')[0].innerHTML = "Bạn có thực sự muốn xóa Khách hàng " + id + " - " + name + " không?";
        }
        else {
            $('#dialog-delete .dialog-delete-center .content')[0].innerHTML = "Bạn có chắc chắn muốn xóa những khách hàng đã chọn không?";

        }
    }

    CloseDialogDelete() {
        var dialog = $('#dialog-delete');
        dialog.css("display", "none");
        $('.father .Right').css('opacity', '1');
        $('.father .nav-menu').css('opacity', '1');
        $('.main-table tbody tr').removeClass('selected');
    }

    ClickButtonDelete() {
        var me = this;
        var listRefID = [];
        var listRow = $('.selected, .selected1[recordID]');
        $.each(listRow, function (index, item) {
            var refid = item.getAttribute('recordID');
            listRefID.push(refid);
        });

        $.ajax({
            method: 'DELETE',
            url: '/refs',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(listRefID),
            success: function () {
                var dialog = $('#dialog-delete');
                dialog.css("display", "none");
                $('.father .Right').css('opacity', '1');
                $('.father .nav-menu').css('opacity', '1');
                me.loadData();
                me.SetStatusButton();
            },
            error: function () {
                alert('Không xóa được!');
            },
        });
    }

    /**
     * Hàm nạp dữ liệu
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 24/08/2019
     * */
    ReloadData() {
        $('.loading').show();
        $('#pageIndex')[0].value = "1";
        $('#pageSize')[0].value = "50";
        this.loadData();
        this.SetStatusButton1();
    }


    /**
    * Hàm thiết lập trạng thái cho button-toolbar ( khi không có bản ghi nào thì một số button sẽ disable)
    * Người tạo: Nguyễn Đức Thiện
    * Ngày tạo: 24/08/2019
    * */
    SetStatusButton1() {
        var sizeTable = $('.main-table tbody tr.selected').length;
        if (sizeTable === 0) {
            $('button.delete').attr('disabled', 'disabled');
            $('button.edit').attr('disabled', 'disabled');
            $('button.duplicate').attr('disabled', 'disabled');
        }
        if (sizeTable > 1) {
            $('button.edit').attr('disabled', 'disabled');
            $('button.duplicate').attr('disabled', 'disabled');
        }
    }

    /**
     * Chức năng chọn một hàng
     * Người tạo: Nguyễn Đức Thiện
     * Ngày tạo: 25/08/2019
     * */
    RowOnClick() {
        var row = $(this);
        $('.main-table tbody tr').removeClass("selected");
        $('.main-table tbody tr[select="select"]').addClass("selected");
        row.addClass('selected');
        $('button.delete').removeAttr('disabled');
        $('button.edit').removeAttr('disabled');
        $('button.duplicate').removeAttr('disabled');
    }
    /**
    * Thực hiện chức năng khi chọn nhiều hàng
    * Người tạo: Nguyễn Đức Thiện
    * Ngày tạo: 24/08/2019
    * */
    RowsOnClick(event) {
        var row = $(this);
        if (event.ctrlKey) {
            row.attr('select', 'select');
            row.addClass('selected');
        }
    }
}


