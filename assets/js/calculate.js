$(document).ready(function () {
  var displayBox = document.getElementById("display");
  // var inputText = document.getElementById("inputText");
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
    //$("button").prop("disabled", false);
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
  });

  //OPERATORS
  $("#add").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "+";
  });
  $("#subtract").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "-";
  });
  $("#multiply").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "×";
  });
  $("#divide").click(function () {
    evaluate();
    checkLength(displayBox.innerHTML);
    displayBox.innerHTML += "÷";
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

  // anlzou 组合运算功能
  $('#equals').click(function () {
    // evaluate();
    hasEvaluated = true;
  });

  //anlzou 删除功能

  //anlzou 重置
  $('#rest').click(function () {
    location.reload();
  });

  // anlzou nav
  $('#what').click(function () {
    let displayText = "##基本按钮" + "<br/>" + "C(cls)：清理输入框。" + "<br/>" + "D(delete)：使用输入框中的元素删除组合列表中的对应元素。" + "<br/>" +
      "B(back)：输入框退格。" + "<br/>" + "R(reset)：重置组合运算公式；与F5刷新、点击" + "“" + "Assemble-Calculator”"
      + "logo等同功能。" + "<br/><br/>" + "##功能用法" + "<br/>" + "1、输入任意多个数值，数值之间用空格按钮(空格>=1)隔开；<br/>点击" + "“" + "=" + "”" +
      "按钮进行组合运算；<br/>点击" + "D(delete)进行列表元素删除。<br/><br/>" + "##变量限定<br/>" + "1、输入框的字符串长度为24。<br/>" + "2、C(n,m)中规定0&le;n,m&le;=16。" + br;
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

  //CHECK FOR LENGTH & DISABLING BUTTONS
  function checkLength(num) {
    if (num.toString().length > 7 && num.toString().length < 14) {
      $("#display").css("font-size", "60px");
      // $("#display").css("margin-top", "174px");
    } else if (num.toString().length > 24) {
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

});
