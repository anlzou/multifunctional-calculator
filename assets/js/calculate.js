$(document).ready(function () {
  var displayBox = document.getElementById("display");
  var displayText = document.getElementById("displayText");
  var hasEvaluated = false;

  // anlzou 变量
  var br = "<br/><br/><br/><br/>";

  //CHECK IF 0 IS PRESENT. IF IT IS, OVERRIDE IT, ELSE APPEND VALUE TO DISPLAY
  function clickNumbers(val) {
    if (displayBox.innerHTML === "0" || (hasEvaluated == true && !isNaN(displayBox.innerHTML))) {
      displayBox.innerHTML = val;
    } else {
      displayBox.innerHTML += val;
    }
    hasEvaluated = false;
  }

  //PLUS MINUS
  $("#plus_minus").click(function () {
    if (eval(displayBox.innerHTML) > 0) {
      displayBox.innerHTML = "-" + displayBox.innerHTML;
    } else {
      displayBox.innerHTML = displayBox.innerHTML.replace("-", "");
    }
  });

  //anlzou：取消上次的输入,退格
  $("#back").click(function () {
    displayBox.innerHTML = displayBox.innerHTML.substring(0, displayBox.innerHTML.length - 1);
    $("button").prop("disabled", false);
    $(".calu-w3ls").attr("disabled", false);

    if (displayBox.innerHTML.indexOf(",") > -1) {
      $("button").prop("disabled", false);
      $(".calu_").attr("disabled", true);
    } else {
      $("button").prop("disabled", false);
      $(".calu_").attr("disabled", false);
    }
  });

  //anlzou：+排列计算+当前计算类型提示
  // $("#A").click(function () {
  //   var text = document.getElementById("text");
  //   text.innerHTML = "排列组合计算";
  // });

  //anlzou：+组合计算+当前计算类型提示
  // $("#C").click(function () {
  //   var text = document.getElementById("text");
  //   text.innerHTML = "排列组合计算";
  // });

  //ON CLICK ON NUMBERS
  $("#calu-w3ls").click(function () {
    displayBox.innerHTML = "0";
    $("button").prop("disabled", false);
    $(".calu-w3ls").attr("disabled", false);
  });
  $("#one").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(1);
  });
  $("#two").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(2);
  });
  $("#three").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(3);
  });
  $("#four").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(4);
  });
  $("#five").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(5);
  });
  $("#six").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(6);
  });
  $("#seven").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(7);
  });
  $("#eight").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(8);
  });
  $("#nine").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(9);
  });
  $("#zero").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(0);
  });
  $("#decimal").click(function () {
    if (displayBox.innerHTML.indexOf(".") === -1 ||
      (displayBox.innerHTML.indexOf(".") !== -1 && displayBox.innerHTML.indexOf("+") !== -1) ||
      (displayBox.innerHTML.indexOf(".") !== -1 && displayBox.innerHTML.indexOf("-") !== -1) ||
      (displayBox.innerHTML.indexOf(".") !== -1 && displayBox.innerHTML.indexOf("×") !== -1) ||
      (displayBox.innerHTML.indexOf(".") !== -1 && displayBox.innerHTML.indexOf("÷") !== -1)) {
      clickNumbers(".");
    }
  });

  // anlzou空格
  $("#space").click(function () {
    checkLength(displayBox.innerHTML);
    clickNumbers(",");
    $("button").prop("disabled", false);
    $(".calu_").attr("disabled", true);

    // $("button").prop("disabled", true);
    // $(".calu_").attr("disabled", false);
  });

  //OPERATORS
  $("#add").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "+";

    $("button").prop("disabled", false);
    $(".calu_sapce").attr("disabled", true);
  });
  $("#subtract").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "-";

    $("button").prop("disabled", false);
    $(".calu_sapce").attr("disabled", true);
  });
  $("#multiply").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "×";

    $("button").prop("disabled", false);
    $(".calu_sapce").attr("disabled", true);
  });
  $("#divide").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "÷";

    $("button").prop("disabled", false);
    $(".calu_sapce").attr("disabled", true);
  });
  // $("#square").click(function () {
  //   var num = Number(displayBox.innerHTML);
  //   num = num * num;
  //   checkLength(num);
  //   displayBox.innerHTML = num;
  // });
  // $("#sqrt").click(function () {
  //   var num = parseFloat(displayBox.innerHTML);
  //   num = Math.sqrt(num);
  //   displayBox.innerHTML = Number(num.toFixed(5));
  // });

  // 全组合排列
  function getGroup(data, index = 0, group = []) {
    var need_apply = new Array();
    need_apply.push(data[index]);
    for (var i = 0; i < group.length; i++) {
      need_apply.push(group[i] + data[index]);
    }
    group.push.apply(group, need_apply);

    if (index + 1 >= data.length) return group;
    else return getGroup(data, index + 1, group);
  }

  // 全组合
  function permute(input) {
    var permArr = [],
      usedChars = [];
    function main(input) {
      var i, ch;
      for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
          permArr.push(usedChars.slice());
        }
        main(input);
        input.splice(i, 0, ch);
        usedChars.pop();
      }
      return permArr
    }
    return main(input);
  };

  // 选择组合
  function groups(array, M) {
    var N = array.length;
    var top = 0, queue = [], flag = [], arr = [], _arr = [];
    function comb(s, n, m) {
      var i;
      if (s > n)
        return;

      if (top == m) {
        for (i = 0; i < m; i++) {
          _arr.push(queue[i]);
        }
        arr.push(_arr)
        _arr = []
        return;
      }
      queue[top++] = array[s];
      comb(s + 1, n, m);
      top--;
      comb(s + 1, n, m);
    }
    comb(0, N, M);
    return arr
  }

  // 控制输出长度 $001
  function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  }

  // 输出框按钮
  var btn_end = "<br/><button class\=\"btn calu-w3ls hvr-back-pulse btn_\" onclick\=\"opcheckboxed(\'checkbox\'\, \'checkall\')\"\>全选\<\/button\>" +
    "<button class\=\"btn calu-w3ls hvr-back-pulse btn_\" onclick\=\"opcheckboxed(\'checkbox\'\, \'uncheckall\')\"\>取消\<\/button\>" +
    "<button class\=\"btn calu-w3ls hvr-back-pulse btn_\" onclick\=\"opcheckboxed(\'checkbox\'\, \'reversecheck\')\"\>反选\<\/button\>" +
    "<button class\=\"btn calu-w3ls hvr-back-pulse btn_\" onclick\=\"deleteSelect()\"\>删除\<\/button\><br/>";

  // 集合显示到输出框
  function show(list) {
    let k = 1;
    let p;
    let l = (list.length).toString().length;
    for (let i in list) {
      p = k;
      p = p.toString();
      // text1 = text1.replace(new RegExp(text2, 'g'), "");
      p = p.replace(new RegExp("0", 'g'), "⁰");
      p = p.replace(new RegExp("1", 'g'), "¹");
      p = p.replace(new RegExp("2", 'g'), "²");
      p = p.replace(new RegExp("3", 'g'), "³");
      p = p.replace(new RegExp("4", 'g'), "⁴");
      p = p.replace(new RegExp("5", 'g'), "⁵");
      p = p.replace(new RegExp("6", 'g'), "⁶");
      p = p.replace(new RegExp("7", 'g'), "⁷");
      p = p.replace(new RegExp("8", 'g'), "⁸");
      p = p.replace(new RegExp("9", 'g'), "⁹");
      displayText.innerHTML += "$" + PrefixInteger(p, l) + " [" + list[i] + "]<br/>";
      k = k + 1;
    }
    displayText.innerHTML += btn_end;
    return;
  }

  // <input type="checkbox" name="checkbox" id="checkbox1" value="1">
  // <label id="label1" for="checkbox1">$01 [0,1,2,3,4,5,6,7,8,9,10,11]</label>
  // 集合显示到输出框
  function show2(list) {
    let input_id = 1;
    let l = (list.length).toString().length;
    displayText.innerHTML += btn_end;
    for (let i in list) {
      displayText.innerHTML += "\<input type\=\"checkbox\" name\=\"checkbox\" id\=\"checkbox" + input_id + "\" value\=\"" + input_id + "\">" +
        "\<label id\=\"label" + input_id + "\" for\=\"checkbox" + input_id + "\"\>" + "$" + PrefixInteger(input_id, l) + " [" + list[i] + "]" + "\<\/label\>";
      input_id = input_id + 1;
    }
    displayText.innerHTML += btn_end;
    return;
  }

  var can_delete = 0;

  // anlzou 运算功能
  $('#equals').click(function () {
    if (displayBox.innerHTML.indexOf(",") == -1) {//普通计算功能
      evaluate();
      hasEvaluated = true;
      displayText.innerHTML = displayBox.innerHTML;
    } else {//组合功能
      let list;
      let regx1 = /[0-9]+/g;
      let mytext = displayBox.innerHTML;
      let index = mytext.indexOf(",");
      //判断开头
      if (index == 0) {
        displayText.innerHTML = "“,”不能开头";
      } else {//,,功能
        index = mytext.indexOf(",,");
        let m = mytext.substring(index, mytext.length);
        m = m.match(regx1)[0];
        displayText.innerHTML = m;
        Number(m);
        if (index != -1) {//有,,
          let text2 = mytext.substring(0, index);
          list = text2.match(regx1);
          list = groups(list, m);
          // console.log(list);
          if (list == "") {
            // displayText.innerHTML = "error:m>n!"
            alert("error:m>n!");
            return;
          }
          displayText.innerHTML = "";
          show2(list);
        } else {//没有,,
          // displayText.innerHTML = mytext;
          list = mytext.match(regx1);
          displayText.innerHTML = list[1];
          let array = new Array();
          if (list[0] > 12) {
            // displayText.innerHTML = "( ఠൠఠ )ﾉCPU会炸di！规定n<13";
            alert("( ఠൠఠ )ﾉCPU会炸di！规定n<13");
            return;
          }
          for (let i = 0; i < list[0]; i++) {
            array[i] = i + 1;
          }
          list = groups(array, list[1]);
          if (list == "") {
            // displayText.innerHTML += "error:m>n!"
            alert("error:m>n!");
            return;
          }
          displayText.innerHTML = "";
          show2(list);
        }
      }
      displayText.innerHTML += br + br;
      can_delete = 1;
    }
  });

  // anlzou 删除功能new
  $('#delete').click(function () {
    let listT;
    let listB;
    if (can_delete == 0) {
      // displayText.innerHTML = "列表没有可以删除的元素。";
      alert("列表没有可以删除的元素。");
    } else {
      can_delete = 1;
      let regxT = /^\s[0-9]+\]$/g;
      let regxB = /[0-9]+/g;
      let mytext = displayBox.innerHTML;
      let index = mytext.indexOf(",");
      //判断开头
      if (index == 0) {
        // displayText.innerHTML = "“,”不能开头";
        alert("“,”不能开头");
      } else if (index != -1) {//有,
        let textT = displayText.innerHTML;
        let textB = displayBox.innerHTML;
        listB = textB.match(regxB);
        listT = textT.match(regxT);
        let parent = document.getElementById("displayText");
        for (let i in listT) {//最后问题
          for (let k in i) {
            for (let j in listB) {
              if (listB[j] == listT[i][k]) {
                var label_d = document.getElementById("label" + i);
                var checkbox_d = document.getElementById("checkbox" + i);
                parent.removeChild(label_d);
                parent.removeChild(checkbox_d);
              }
              break;
            }
          }
        }
      } else {//没有,;直接删除元素
        let parent = document.getElementById("displayText");
        // let textT = displayText.innerHTML;
        let textB = displayBox.innerHTML;
        var label_d = document.getElementById("label" + textB);
        var checkbox_d = document.getElementById("checkbox" + textB);
        parent.removeChild(label_d);
        parent.removeChild(checkbox_d);
        // displayText.innerHTML = text1;
      }
    }
  });

  // var objcheckboxList = document.getElementsByName("checkbox");
  // var parent = document.getElementById("displayText");
  // var label_id;
  // var label_del;
  // if (null != objcheckboxList) {
  //   for (let i = 0; i < objcheckboxList.length; i++) {
  //     if (objcheckboxList[i].checked == true) {
  //       label_id = "label" + objcheckboxList[i].value;
  //       label_del = document.getElementById(label_id);
  //       parent.removeChild(label_del);
  //       parent.removeChild(objcheckboxList[i]);
  //       i = i - 1;//神奇效果
  //     }
  //   }
  // }

  //anlzou 删除功能
  $('#delete1').click(function () {
    let list;
    if (can_delete == 0) {
      alert("列表没有可以删除的元素。");
    } else {
      can_delete = 1;
      let regx1 = /[0-9]+/g;
      // let regx2 = /^\s[0-9]+\]$/g;
      let mytext = displayBox.innerHTML;
      let index = mytext.indexOf(",");
      //判断开头
      if (index == 0) {
        // displayText.innerHTML = "“,”不能开头";
        alert("“,”不能开头");
      } else if (index != -1) {//有,
        let text1 = displayText.innerHTML;
        let text2 = displayBox.innerHTML;
        list = text2.match(regx1);
        // displayText.innerHTML = list;
        // console.log(list);
        for (let i of list) {
          text1 = text1.replace(new RegExp(i, 'g'), "");
        }
        displayText.innerHTML = text1;
      } else {//没有,;直接删除元素
        let text1 = displayText.innerHTML;
        let text2 = displayBox.innerHTML;
        text1 = text1.replace(new RegExp(text2, 'g'), "");
        displayText.innerHTML = text1;
      }
    }
  });
  //anlzou 重置
  $('#rest').click(function () {
    location.reload();
  });

  // anlzou nav
  $('#what').click(function () {
    let displayText = "##基本按钮" + "<br/>" + "C(cls)：清理输入框。" + "<br/>" + "D(delete)：使用输入框中的元素删除组合列表中的对应元素。" + "<br/>" +
      "B(back)：输入框退格。" + "<br/>" + "R(reset,已经删除)：重置组合运算公式；与F5刷新、点击" + "“" + "Assemble-Calculator”"
      + "logo等同功能。" + "<br/><br/>" + "##功能用法" + "<br/>" + "1、输入任意多个数值，数值之间用" + "“" + "," + "”" + "按钮(,&ge;1)隔开；<br/>2、如果只有一个" + "“" + "," + "”" +
      "则取第一个(n,m)做组合运算，如果连续的逗号大于1个，则取第一个连续逗号前面的所有数为集合n，选连续逗号后面的值为m进行组合运算。" + "<br/>3、点击" + "“" + "=" + "”" +
      "按钮进行组合运算；<br/>4、点击" + "D(delete)使用输入框中的数进行列表元素删除。<br/>删除的元素不能使用逗号(,)开头,多个元素之间用逗号隔开。<br/>5、普通计算可使用(+-×÷)功能。<br/><br/>" +
      "##变量限定<br/>" + "1、输入框的字符串长度为24。<br/>" + "2、C(n,m)中规定0&le;n,m&le;13。" + br;
    document.getElementById("displayText").innerHTML = displayText;
  });

  $('#functions').click(function () {
    let displayText = "多功能计算器，开发中...<br/>主题，开发中...<br/>Apk，适配中...";
    document.getElementById("displayText").innerHTML = displayText;
  });

  $('#explain').click(function () {
    let displayText = "本软件版权归作者所有，开源仓库github.com/anlzou、gitee.com/anlzou。";
    document.getElementById("displayText").innerHTML = displayText;
  });

  $('#author').click(function () {
    let displayText = "作者：anlzou<br/>QQ：599502931<br/><br/>Bug反馈，交流学习...";
    document.getElementById("displayText").innerHTML = displayText;
  });

  //anlzou:取余运算
  $('#remainder').click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "%";
  });

  //EVAL FUNCTION
  function evaluate() {
    displayBox.innerHTML = displayBox.innerHTML.replace(",", "");
    displayBox.innerHTML = displayBox.innerHTML.replace("×", "*");
    displayBox.innerHTML = displayBox.innerHTML.replace("÷", "/");
    if (displayBox.innerHTML.indexOf("/0") !== -1) {
      $("#display").css("font-size", "60px");
      // $("#display").css("margin-top", "124px");
      $("button").prop("disabled", false);
      $(".calu-w3ls").attr("disabled", false);
      displayBox.innerHTML = "Undefined";
    }
    var evaluate = eval(displayBox.innerHTML);
    if (evaluate.toString().indexOf(".") !== -1) {
      evaluate = evaluate.toFixed(5);
    }
    checkLength(evaluate);
    displayBox.innerHTML = evaluate;
  }

  // anlzou 输入框滚动显示
  function scroll() {
    setInterval(function () {
      displayBox.scrollLeft++;
    }, 120);
  }

  //CHECK FOR LENGTH & DISABLING BUTTONS
  function checkLength(num) {
    if (num.toString().length > 8) {
      // displayBox.style.textAlign = "right";
      scroll();
    } else {
      displayBox.style.textAlign = "left";
    }
    if (num.toString().length > 7 && num.toString().length < 14) {
      $("#display").css("font-size", "60px");
      // $("#display").css("margin-top", "174px");
    } else if (num.toString().length >= 24 - 1) {
      num = "Infinity";
      $("button").prop("disabled", true);
      $(".calu-w3ls").attr("disabled", false);
    }
  }

  //TRIM IF NECESSARY
  function trimIfNecessary() {
    var length = displayBox.innerHTML.length;
    if (length > 7 && length < 14) {
      $("#display").css("font-size", "60px");
      // $("#display").css("margin-top", "174px");
    } else if (length > 14) {
      displayBox.innerHTML = "Infinity";
      $("button").prop("disabled", true);
      $(".calu-w3ls").attr("disabled", false);
    }
  }

  // anlzou
  // 代码优化，全选、取消全选、反选
  // 将选中设置为 checked 或 true， 取消选中可设置为空或 false，实现反选使用 checked 属性会出现问题。
});

function opcheckboxed(objName, type) {
  var objNameList = document.getElementsByName(objName);
  if (null != objNameList) {
    for (var i = 0; i < objNameList.length; i++) {
      if (objNameList[i].checked == true) {
        if (type != 'checkall') {  // 非全选
          objNameList[i].checked = false;
        }

      } else {
        if (type != 'uncheckall') {  // 非取消全选
          objNameList[i].checked = true;
        }
      }
    }
  }
}

function deleteSelect() {
  var objcheckboxList = document.getElementsByName("checkbox");
  var parent = document.getElementById("displayText");
  var label_id;
  var label_del;
  if (null != objcheckboxList) {
    for (let i = 0; i < objcheckboxList.length; i++) {
      if (objcheckboxList[i].checked == true) {
        label_id = "label" + objcheckboxList[i].value;
        label_del = document.getElementById(label_id);
        parent.removeChild(label_del);
        parent.removeChild(objcheckboxList[i]);
        i = i - 1;//神奇效果
      }
    }
  }
}
