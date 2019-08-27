
class Base {

    constructor() {
        this.loadData();
        this.InitEventsBase();
        this.SetStatusButton();
        //this.SetStatusButton1();
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
            beforeSend: function () {
                $('#load-data').show();
            },
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
                        rowHTML.append('<td class = "{1}" style="padding-left:38px; padding-top:5px;"><input type="checkbox"></td>'.format(cls));
                    }
                    else if (fieldName === "status") {
                        rowHTML.append('<td class = "{1}" style="padding-left:33px; padding-top:5px;"><input type="checkbox"></td>'.format(cls));
                    }
                    else
                        rowHTML.append('<td class = "{1}" ></td>'.format(cls));
                }

            });
            $('.main-table tbody').append(rowHTML);
            $('.main-table tbody tr td').addClass("settbodyTd");
            $('.main-table tbody tr').addClass("settbody");
            $('.main-table tbody tr:odd').css("background-color", "#F2F2F2");
            $('.main-table tbody tr:even').css("background-color", "#ffffff");
            $('button.delete').attr('disabled', 'disabled');
            $('button.edit').attr('disabled', 'disabled');
            $('button.duplicate').attr('disabled', 'disabled');
            

        });
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
        $('.page-division .ten')[0].innerHTML = "Hiển thị " + 1 + " - " + lengthPage + " trên " + lengthPage + " kết quả";
    }

    SetStatusButton() {
        var sizeTable = $('.main-table tbody tr').length;
        if (sizeTable === 0) {
            $('button.delete').attr('disabled', 'disabled');
        }
    }

    
}

