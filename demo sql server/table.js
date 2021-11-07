function fetchTable (value) {
  var url = 'http://localhost:3000/api/bill?start='+value;
  $.ajax(url)
    .done(function (data) {
      length = data['tableLength']
      data = data['data']
      var source = document.getElementById('entry-template').innerHTML;
      var template = Handlebars.compile(source);
      var html = template(data);
      $('#listBill').html(html);
      document.getElementById("currentPage").innerHTML = currentPage + '/' + length/100
    }).fail(function (err) {
      console.log(err);
    });
}