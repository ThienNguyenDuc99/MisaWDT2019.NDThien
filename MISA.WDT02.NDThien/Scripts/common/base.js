class Base {

    constructor() {
        this.loadData();
        this.InitEventsBase();
        this.SetStatusButton();
        this.AddCustomerId();
        this.NumberPage();
        this.SetStatus();
    }
    InitEventsBase() {

    }
    /**Lấy toàn bộ dữ liệu */
    getData() {
        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/refs',
            async: false,
            dataType: "json",
            success: function (res) {
                if (res.Success) {
                    fakeData = res.Data;
                } else {
                    alert(res.Message);
                }
            }
        });
        return fakeData;
    }
    /**Lấy dữ liệu phân trang */
    getData1() {
        var pageIndex = $('#pageIndex').val();
        var pageSize = $('#pageSize').val();
        var fakeData = [];
        $.ajax({
            method: 'GET',
            url: '/refs/{0}/{1}'.format(pageIndex, pageSize),
            async: false,
            dataType: "json",
            //beforeSend: function () {
            //    $('.loading').show();
            //},
            success: function (res) {
                if (res.Success) {
                    fakeData = res.Data;
                    
                } else {
                    alert(res.Message);
                }
            },
            error: function (res) {
            }
        });
        return fakeData;
    }
    loadData() {
        var me = this;
        var data = this.getData1();
        var fields = $('th[fieldName]');
        $('.main-table tbody').empty();
        $.each(data, function (index, item) {
            var rowHTML = $('<tr recordID = "{0}"></tr>'.format(item["refID"]));
            $.each(fields, function (fieldIndex, fieldItem) {
                var fieldName = fieldItem.getAttribute('fieldName');
                var cls = 'text-left';
                var value = item[fieldName];
                if (value) {
                    if (fieldName) {
                        rowHTML.append('<td class = "{1}">{0}</td>'.format(value, cls));
                    }
                }
                else {
                    if (fieldName === "member5food") {
                        rowHTML.append('<td class = "{1}" style="padding-left:57px; padding-top:5px;"><input type="checkbox"></td>'.format(cls));
                    }
                    else if (fieldName === "status") {
                        rowHTML.append('<td class = "{1}" style="padding-left:57px; padding-top:5px;"><input type="checkbox"></td>'.format(cls));
                    }
                    else
                        rowHTML.append('<td class = "{1}" ></td>'.format(cls));
                }
                $('.main-table tbody').append(rowHTML);
                me.SetStatus();
            });
           
        });
        this.NumberPage();
        setTimeout(function () { $('.loading').hide(); }, 700);
    }
    /**Hàm set trạng thái cho button khi không còn bản ghi nào */
    SetStatusButton() {
        var sizeTable = $('.main-table tbody tr').length;
        if (sizeTable === 0) {
            $('button.delete').attr('disabled', 'disabled');
        }
    }
    /**
     * Hàm sinh mã tự động khi thêm khách hàng
     * Người tạo: Nguyễn Đức Thiện
     * Thời gian: 26/08/2019
     * */
    AddCustomerId() {
        var data = this.getData();
        var listId = [];
        var lengthTr = data.length;
        var max = 0;
        for (var i = 0; i < lengthTr; i++) {
            listId[i] = data[i].customerId;
            listId[i] = listId[i].slice(2, 7);
            listId[i] = parseInt(listId[i]);
            if (listId[i] > max) {
                max = listId[i];
            }
        }
        listId.sort(function (a, b) { return b - a });
        listId.reverse();
        var x = 0;
        for (var i = 0; i < lengthTr; i++) {
            if (listId[0] > 1) {
                x = 1;
                break;
            }
            if (listId[i] - i > 1) {
                x = listId[i - 1] + 1;
                break;
            }
            if (i == lengthTr - 1) {
                x = listId[i] + 1;
                break;
            }
        }
        var stringX = x.toString();
        if (x < 10) {
            stringX = "KH0000" + stringX;
        }
        if (x < 100 && x > 9) {
            stringX = "KH000" + stringX;
        }
        if (x < 1000 && x > 99) {
            stringX = "KH00" + stringX;
        }
        if (x < 10000 && x > 999) {
            stringX = "KH0" + stringX;
        }
        if (x < 100000 && x > 9999) {
            stringX = "KH" + stringX;
        }
        return stringX;
    }
    /**
     * Set trạng thái cho bảng
     * Người tạo: Nguyễn Đức Thiện
     * Thời gian: 24/08/2019
     * */
    SetStatus() {
        $('.main-table tbody tr td').addClass("settbodyTd");
        $('.main-table tbody tr').addClass("settbody");
        $('.main-table tbody tr:odd').css("background-color", "#f2f2f2");
        $('.main-table tbody tr:even').css("background-color", "#ffffff");
        $('button.delete').attr('disabled', 'disabled');
        $('button.edit').attr('disabled', 'disabled');
        $('button.duplicate').attr('disabled', 'disabled');
    }
    /**
     * Hàm set trạng thái cho phần phân trang
     * Người tạo: Nguyễn Đức Thiện
     * Thời gian: 27/08/2019
     * */
    NumberPage() {
        var pageIndex = $('#pageIndex').val();
        var pageSize = $('#pageSize').val();
        pageIndex = parseInt(pageIndex);      
        pageSize = parseInt(pageSize);
        var pageIndex = $('#pageIndex').val();
        var pageSize = $('#pageSize').val();
        var data1 = this.getData();
        var lengthData = data1.length;
        var lengthPage = lengthData / pageSize;
        lengthPage = Math.ceil(lengthPage);
        lengthPage = lengthPage.toString();
        $('.page-division button').attr('disabled', false);
        if (pageIndex == "1") {
            $('button.page-first').attr('disabled', 'disabled');
            $('button.page-prev').attr('disabled', 'disabled');
        }
        if (pageIndex == lengthPage) {
            $('button.page-last').attr('disabled', 'disabled');
            $('button.page-next').attr('disabled', 'disabled');
        }
        $('.page-division .five')[0].innerHTML = "trên " + lengthPage;
        var numberResult = this.getData().length;
        if (pageIndex === lengthPage) {
            $('.page-division .ten')[0].innerHTML = "Hiển thị " + ((pageIndex - 1) * pageSize + 1) + " - " + numberResult + " trên " + numberResult + " kết quả";
        }
        else
        $('.page-division .ten')[0].innerHTML = "Hiển thị " + ((pageIndex - 1)*pageSize +1)   + " - " + pageIndex*pageSize + " trên " + numberResult + " kết quả";
    }
}
