$('#btnSave').on('click', function(){
    let objToPost = {
        MaHD: $('#MaHD').val(),
        MaKH: $('#MaKH').val(),
        NgayLap: $('#NgayLap').val(),
        TongTien: $('#TongTien').val()
    }
   // alert($("#MaHD").attr('value'))
    $.ajax({
        url: 'http://localhost:3000/api/bill',
        type: 'POST',
        data: JSON.stringify(objToPost),
        timeout: 10000,
        contentType: "application/json"
    }).done(function (data){
        alert('Bill is added');
    }).fail(function (xhr, textStatus, error){
        console.log(textStatus);
        console.log(error);
        alert(error);
        console.log(xhr);
    });
})