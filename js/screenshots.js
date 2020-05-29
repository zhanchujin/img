//两个参数：所需要截图的元素id，截图后要执行的函数， canvas为截图后返回的最后一个canvas
~ function () {
  // 点击发布按钮将画布div里面的内容截图，生成canvas，再将canvas图像提取出base64字符串数据存入数组中
  document.getElementsByClassName('publish')[0].onclick = function () {
    let info = confirm('确认提交吗？');
    if (info) {
      html2canvas(document.getElementById('area')).then(function (canvas) {
          let str = canvas.toDataURL();
          // 将对象数据提交给php
          $.ajax({
            type: "POST",
            //提交的网址
            url: "php/index.php",
            //提交的数据   该参数为属性值类型的参数
            data: {
              obj: str
            },
            datatype: "json",
            success: function (data) {
              console.log(data);
              window.location.href = "show.php";
            }
          });
      });
    alert('提交成功');
  } else {
    alert('提交失败');
  }
}

// 生成时间
function date() {
  var mydate = new Date();
  var str = "" + mydate.getFullYear() + "年";
  //判断小于是是直接小于10月就可以了
  if (mydate.getMonth() < 10) {
    str += "0" + (mydate.getMonth() + 1) + "月";
  } else {
    str += (mydate.getMonth() + 1) + "月";
  }
  //判断小于是是直接小于10日就可以了
  if (mydate.getDate() < 10) {
    str += "0" + mydate.getDate() + "日";
  } else {
    str += mydate.getDate() + "日";
  }
  str += mydate.getHours() + "时";
  str += mydate.getMinutes() + "分";
  str += mydate.getSeconds() + "秒";
  return str;
}

}();